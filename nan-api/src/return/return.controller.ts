import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnItem } from '@prisma/client';
import { ReturnFilterDto } from './dto/return-filter.dto';
@ApiBearerAuth()
@ApiTags('Returns')
@Controller('returns')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}
  @Get('all/pagination')
  @ApiOperation({
    summary: 'Tất cả (Có phân trang và tìm kiếm)',
  })
  async findAllPagination(@Query() filterDto: ReturnFilterDto): Promise<{
    data: ReturnItem[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page, limit, ...filters } = filterDto;
    return this.returnService.findAllPagination(page, limit, filters);
  }
  @Post('create')
  @ApiOperation({
    summary: 'Tạo mới',
  })
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnService.create(createReturnDto);
  }

  @Get()
  findAll() {
    return this.returnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnService.update(+id, updateReturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnService.remove(+id);
  }
}
