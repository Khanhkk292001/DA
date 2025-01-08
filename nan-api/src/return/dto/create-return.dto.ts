import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
export class CreateReturnDto {
  @ApiProperty({
    description: 'Mô tả',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Mã đơn thuê',
  })
  @IsNotEmpty()
  @IsMongoId()
  rentalId: string;

  @ApiProperty({
    description: 'Đã trả đầy đủ hay chưa',
    default: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isFullyReturned: boolean;
}
