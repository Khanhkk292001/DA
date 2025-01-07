import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
export class CreateReturnDto {
  @ApiProperty({
    description: 'Mô tả',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Số lượng',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Mã thiết bị',
  })
  @IsNotEmpty()
  @IsMongoId()
  equipmentId: string;
}
