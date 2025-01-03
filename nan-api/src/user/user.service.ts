import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { IdentityDocStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { User } from './entities/user.entity';
import { UpdateIdentityDocDto } from './dto/update-identity-doc.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { prismaErrorHandler } from 'src/common/messages';
import { UpdateStatusDto } from './dto/update-status.sto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllPagination(
    page: number,
    limit: number,
    filters: UserFilterDto,
  ): Promise<{ data: any[]; total: number; page: number; limit: number }> {
    try {
      const parsedPage = parseInt(page.toString(), 10);
      const parsedLimit = parseInt(limit.toString(), 10);

      if (isNaN(parsedPage) || parsedPage <= 0) {
        throw new Error('Invalid page number');
      }
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new Error('Invalid limit number');
      }

      const whereClause: Prisma.UserWhereInput = {
        ...(filters.name && {
          name: { contains: filters.name, mode: Prisma.QueryMode.insensitive },
        }),
        ...(filters.email && {
          email: {
            contains: filters.email,
            mode: Prisma.QueryMode.insensitive,
          },
        }),
        ...(filters.role && {
          role:
            filters.role === 'user' || filters.role === 'admin'
              ? filters.role
              : undefined,
        }),

        ...(filters.statusIdentityDoc !== 'all' && {
          statusIdentityDoc: filters.statusIdentityDoc as IdentityDocStatus,
        }),
      };

      const [data, total] = await Promise.all([
        this.prisma.user.findMany({
          where: whereClause,
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.user.count({
          where: whereClause,
        }),
      ]);

      return {
        data,
        total,
        page: parsedPage,
        limit: parsedLimit,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to retrieve users with pagination and filters');
    }
  }

  async create(dto: CreateUserDto) {
    if (dto.password !== dto.passwordconf)
      throw new BadRequestException('Passwords do not match');

    if (dto.role && !Role[dto.role])
      throw new BadRequestException('Invalid role');

    dto.email = dto.email.toLowerCase().trim();

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const { passwordconf, ...newUserData } = dto;
      newUserData.password = hashedPassword;

      const newuser = await this.prisma.user.create({
        data: newUserData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return newuser;
    } catch (error) {
      this.prismaErrorHanler(error, 'POST', dto.email);
      throw new InternalServerErrorException('Server error');
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return { data: users };
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }

  async findOne(field: string, value: string, user: User) {
    if (
      value !== user[field] &&
      user.role !== 'admin' &&
      user.role &&
      user.role !== 'super_admin'
    )
      throw new UnauthorizedException('Unauthorized');

    const whereData = field === 'id' ? { id: value } : { email: value };

    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: whereData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          identityDoc: true,
          phoneNumber: true,
          dateOfBirth: true,
          avatar: true,
          gender: true,
          statusIdentityDoc: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return { data: user };
    } catch (error) {
      this.prismaErrorHanler(error, 'GET', value);
      throw new InternalServerErrorException('Server error');
    }
  }

  async update(field: string, value: string, dto: UpdateUserDto, user: User) {
    if (
      value !== user[field] &&
      user.role !== 'admin' &&
      user.role &&
      user.role !== 'super_admin'
    )
      throw new UnauthorizedException('Unauthorized');

    const whereData = field === 'id' ? { id: value } : { email: value };

    if (user.role !== 'admin' && user.role !== 'super_admin') delete dto.role;

    const { passwordconf, ...newUserData } = dto;

    if (dto.password) {
      if (dto.password !== passwordconf)
        throw new BadRequestException('Passwords do not match');

      newUserData.password = await bcrypt.hash(dto.password, 10);
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: whereData,
        data: newUserData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return updatedUser;
    } catch (error) {
      this.prismaErrorHanler(error, 'PATCH', value);
      throw new InternalServerErrorException('Server error');
    }
  }

  async remove(field: string, value: string, user: User) {
    if (
      value !== user[field] &&
      user.role !== 'admin' &&
      user.role &&
      user.role !== 'super_admin'
    )
      throw new UnauthorizedException('Unauthorized');

    const whereData = field === 'id' ? { id: value } : { email: value };

    try {
      const deletedUser = await this.prisma.user.delete({
        where: whereData,
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      return { message: 'User deleted' };
    } catch (error) {
      this.prismaErrorHanler(error, 'DELETE', value);
      throw new InternalServerErrorException('Server error');
    }
  }

  prismaErrorHanler = (error: any, method: string, value: string = null) => {
    if (error.code === 'P2002') {
      throw new BadRequestException('User already exists');
    }
    if (error.code === 'P2025') {
      throw new BadRequestException('User not found');
    }
  };

  async getRentals(user: User) {
    try {
      const rentals = await this.prisma.rental.findMany({
        where: {
          userId: user.id,
        },
      });
      return { data: rentals };
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }

  async updateIdentityDoc(
    userId: string,
    dto: UpdateIdentityDocDto,
  ): Promise<{ message: string }> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { identityDoc: dto.identityDoc },
      });

      if (!updatedUser) {
        throw new BadRequestException(`User with id ${userId} not found.`);
      }

      return { message: 'Identity document updated successfully' };
    } catch (error) {
      this.prismaErrorHanler(error, 'PATCH', userId);
      throw new InternalServerErrorException(
        'Failed to update identity document',
      );
    }
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    try {
      const profile = await this.prisma.user.update({
        where: { id: userId },
        data: dto,
      });

      return { data: profile };
    } catch (error) {
      prismaErrorHandler(error);
    }
  }

  async updateIdentityDocStatus(userId: string, dto: UpdateStatusDto) {
    try {
      const status = await this.prisma.user.update({
        where: { id: userId },
        data: dto,
      });

      return { data: status };
    } catch (error) {
      prismaErrorHandler(error);
    }
  }
}
