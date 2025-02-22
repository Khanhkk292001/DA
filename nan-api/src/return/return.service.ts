import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaErrorHandler } from 'src/common/messages';
import { ReturnFilterDto } from './dto/return-filter.dto';
import { Prisma, ReturnItem } from '@prisma/client';

@Injectable()
export class ReturnService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPagination(
    page: number,
    limit: number,
    filters: Partial<ReturnFilterDto>,
  ): Promise<{
    data: ReturnItem[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const whereClause: Prisma.ReturnItemWhereInput = {
        ...(filters.description && {
          description: {
            contains: filters.description,
            mode: Prisma.QueryMode.insensitive,
          },
        }),
        // @ts-ignore
        ...(filters.isFullyReturned !== 'all' && {
          isFullyReturned: filters.isFullyReturned == '1' ? true : false,
        }),
        ...(filters.rentalId && {
          categoryId: filters.rentalId,
        }),
      };

      const [data, total] = await Promise.all([
        this.prisma.returnItem.findMany({
          where: whereClause,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.returnItem.count({
          where: whereClause,
        }),
      ]);

      return {
        data,
        total,
        page,
        limit,
      };
    } catch (error) {
      prismaErrorHandler(error);
    }
  }

  async create(dto: CreateReturnDto): Promise<{ message: string }> {
    try {
      const rental = await this.prisma.rental.findUnique({
        where: { id: dto.rentalId },
      });

      if (!rental) {
        throw new NotFoundException('Đơn thuê không tồn tại.');
      }

      await this.prisma.returnItem.create({
        data: dto,
      });
      return { message: 'Tạo mới thành công' };
    } catch (error) {
      prismaErrorHandler(error);
    }
  }

  findAll() {
    return `This action returns all return`;
  }

  async findOne(id: string): Promise<{ data: ReturnItem }> {
    try {
      const data = await this.prisma.returnItem.findUniqueOrThrow({
        where: { id },
      });

      return {
        data,
      };
    } catch (error) {
      prismaErrorHandler(error);
    }
  }

  async update(id: string, dto: UpdateReturnDto): Promise<{ message: string }> {
    try {
      await this.prisma.returnItem.update({
        where: { id },
        data: dto,
      });
      return { message: 'Cập nhật thành công' };
    } catch (error) {
      prismaErrorHandler(error);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.returnItem.delete({ where: { id } });
      return { message: 'Xóa thành công' };
    } catch (error) {
      prismaErrorHandler(error);
    }
  }
}
