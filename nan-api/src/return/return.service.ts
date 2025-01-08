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

  findOne(id: number) {
    return `This action returns a #${id} return`;
  }

  update(id: number, updateReturnDto: UpdateReturnDto) {
    return `This action updates a #${id} return`;
  }

  remove(id: number) {
    return `This action removes a #${id} return`;
  }
}
