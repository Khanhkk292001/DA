import { Injectable } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaErrorHandler } from 'src/common/messages';

@Injectable()
export class ReturnService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReturnDto): Promise<{ message: string }> {
    try {
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
