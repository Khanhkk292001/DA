import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Put,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveItemToCartDto } from './dto/remove-item-to-cart.dto';
import { UpdateItemToCartDto } from './dto/update-item-to-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { Auth, GetUser } from 'src/auth/decorators';

@ApiBearerAuth() 
@ApiTags('Carts') 
@Controller('carts') 
export class CartController {
 
  constructor(private readonly cartService: CartService) {}

  // Thêm sản phẩm vào giỏ hàng
  @Post('add/by-me')
  @ApiOperation({ summary: 'Thêm item vào giỏ hàng' }) 
  @Auth(Role.user) // Chỉ cho phép 'user' truy cập
  async addToCart(
    @GetUser() user: User, // Lấy thông tin người dùng từ token
    @Body() addToCartDto: AddToCartDto, // Lấy dữ liệu từ body của request
  ) {
    
    return this.cartService.addToCart(user.id, addToCartDto);
  }

  // Cập nhật thông tin sản phẩm trong giỏ hàng
  @Patch('update/by-me')
  @ApiOperation({ summary: 'Cập nhật item trong giỏ hàng' }) 
  @Auth(Role.user) 
  async updateItemInCart(
    @GetUser() user: User, 
    @Body() updateItemDto: UpdateItemToCartDto, 
  ) {
  
    return this.cartService.updateItemInCart(user.id, updateItemDto);
  }

  // Xóa sản phẩm khỏi giỏ hàng
  @Delete('remove/by-me')
  @ApiOperation({ summary: 'Xoá item trong giỏ hàng' }) 
  @Auth(Role.user) 
  async removeFromCart(
    @GetUser() user: User, 
    @Body() removeItemDto: RemoveItemToCartDto, 
  ) {
   
    return this.cartService.removeFromCart(user.id, removeItemDto);
  }

  // Lấy thông tin toàn bộ sản phẩm trong giỏ hàng
  @Get('get/by-me')
  @ApiOperation({ summary: 'Thông tin giỏ hàng' }) 
  @Auth(Role.user) 
  async getCartItems(@GetUser() user: User) {
    
    return this.cartService.getCartItems(user.id);
  }

  // Xóa toàn bộ sản phẩm trong giỏ hàng
  @Delete('clear/by-me')
  @ApiOperation({ summary: 'Xoá hết item trong giỏ hàng' }) 
  @Auth(Role.user) 
  async clearCart(@GetUser() user: User) {
    
    return this.cartService.clearCart(user.id);
  }
}
