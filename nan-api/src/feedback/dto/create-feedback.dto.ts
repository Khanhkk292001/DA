import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
} from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Đánh giá từ 1 đến 5',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Nhận xét của người dùng (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'Mã ID người dùng',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Mã ID thuê',
  })
  @IsNotEmpty()
  @IsString()
  rentalId: string;

  @IsOptional()
  rentalItemId: string;
}
