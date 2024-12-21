import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem, Equipment, EquipmentPackage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemToCartDto } from './dto/create-item-to-cart.dto';
import { RemoveItemToCartDto } from './dto/remove-item-to-cart.dto';
import { UpdateItemToCartDto } from './dto/update-item-to-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { prismaErrorHandler } from 'src/common/messages';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {} // Khởi tạo service Prisma để thao tác cơ sở dữ liệu

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    // Thêm sản phẩm hoặc gói sản phẩm vào giỏ hàng của người dùng
    console.log(addToCartDto);

    try {
      // Tìm giỏ hàng của người dùng
      let cart = await this.prisma.cart.findUnique({
        where: { userId: userId },
        include: { items: true },
      });

      // Nếu chưa có giỏ hàng, tạo mới giỏ hàng
      if (!cart) {
        cart = await this.prisma.cart.create({
          data: {
            userId: userId,
            totalAmount: 0,
            items: {
              create: [],
            },
          },
          include: { items: true },
        });
      }

      let updatedItem;

      // Xử lý khi thêm sản phẩm đơn lẻ
      if (addToCartDto.equipmentId) {
        const existingItem = cart.items.find(
          (item) => item.equipmentId === addToCartDto.equipmentId,
        );

        if (existingItem) {
          // Cập nhật số lượng và giá nếu sản phẩm đã tồn tại trong giỏ hàng
          updatedItem = await this.prisma.cartItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: addToCartDto.quantity,
              price: addToCartDto.price || existingItem.price,
            },
          });
        } else {
          // Thêm mới sản phẩm vào giỏ hàng
          updatedItem = await this.prisma.cartItem.create({
            data: {
              cartId: cart.id,
              equipmentId: addToCartDto.equipmentId,
              quantity: addToCartDto.quantity,
              price: addToCartDto.price,
            },
          });
        }
      } else if (addToCartDto.packageId) {
        // Xử lý khi thêm gói sản phẩm
        const existingItem = cart.items.find(
          (item) => item.packageId === addToCartDto.packageId,
        );

        if (existingItem) {
          // Cập nhật số lượng và giá nếu gói sản phẩm đã tồn tại trong giỏ hàng
          updatedItem = await this.prisma.cartItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: addToCartDto.quantity,
              price: addToCartDto.price || existingItem.price,
            },
          });
        } else {
          // Thêm mới gói sản phẩm vào giỏ hàng
          updatedItem = await this.prisma.cartItem.create({
            data: {
              cartId: cart.id,
              packageId: addToCartDto.packageId,
              quantity: addToCartDto.quantity,
              price: addToCartDto.price,
            },
          });
        }
      }

      await this.updateTotalAmount(cart.id); // Cập nhật tổng giá trị của giỏ hàng

      return updatedItem; // Trả về thông tin sản phẩm/gói sản phẩm vừa được thêm
    } catch (error) {
      prismaErrorHandler(error); // Xử lý lỗi thông qua hàm tiện ích
    }
  }

  async updateTotalAmount(cartId: string) {
    // Tính toán và cập nhật tổng giá trị của giỏ hàng
    try {
      const cartItems = await this.prisma.cartItem.findMany({
        where: { cartId: cartId },
      });

      // Tính tổng giá trị bằng cách nhân số lượng với giá của từng sản phẩm
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.price || 0) * item.quantity;
      }, 0);

      await this.prisma.cart.update({
        where: { id: cartId },
        data: { totalAmount: totalAmount },
      }); // Cập nhật tổng giá trị vào bảng `Cart`
    } catch (error) {
      prismaErrorHandler(error); // Xử lý lỗi
    }
  }

  async removeFromCart(userId: string, removeItemDto: RemoveItemToCartDto) {
    // Xóa một sản phẩm hoặc gói sản phẩm khỏi giỏ hàng
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        throw new NotFoundException(`Cart not found for user ${userId}`); // Giỏ hàng không tồn tại
      }

      const itemToRemove = cart.items.find(
        (item) => item.id === removeItemDto.itemId,
      );

      if (!itemToRemove) {
        throw new NotFoundException(`Item not found in cart`); // Sản phẩm không tồn tại trong giỏ
      }

      await this.prisma.cartItem.delete({
        where: { id: removeItemDto.itemId },
      }); // Xóa sản phẩm khỏi giỏ hàng

      await this.updateTotalAmount(cart.id); // Cập nhật tổng giá trị giỏ hàng

      return { message: 'Item removed successfully' }; 
    } catch (error) {
      prismaErrorHandler(error); // Xử lý lỗi
    }
  }

  async updateItemInCart(userId: string, updateItemDto: UpdateItemToCartDto) {
    // Cập nhật số lượng của sản phẩm trong giỏ hàng
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        throw new NotFoundException(`Cart not found for user ${userId}`); 
      }

      const itemToUpdate = cart.items.find(
        (item) => item.id === updateItemDto.itemId,
      );

      if (!itemToUpdate) {
        throw new NotFoundException(`Item not found in cart`); 
      }

      const updatedItem = await this.prisma.cartItem.update({
        where: { id: updateItemDto.itemId },
        data: { quantity: updateItemDto.quantity }, // Cập nhật số lượng sản phẩm
      });

      await this.updateTotalAmount(cart.id); // Cập nhật tổng giá trị giỏ hàng

      return updatedItem; // Trả về thông tin sản phẩm vừa được cập nhật
    } catch (error) {
      prismaErrorHandler(error); 
    }
  }

  async getCartItems(userId: string) {
    // Lấy danh sách sản phẩm và thông tin giỏ hàng
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              equipment: true, 
              package: true,  
            },
          },
        },
      });

      if (!cart) {
        throw new NotFoundException(`Cart not found for user ${userId}`);
      }

      return {
        items: cart.items, // Danh sách sản phẩm trong giỏ hàng
        totalAmount: cart.totalAmount, // Tổng giá trị giỏ hàng
      };
    } catch (error) {
      prismaErrorHandler(error); 
    }
  }

  async clearCart(userId: string) {
    // Xóa toàn bộ sản phẩm trong giỏ hàng
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        throw new NotFoundException(`Cart not found for user ${userId}`); 
      }

      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      }); // Xóa toàn bộ sản phẩm trong giỏ

      await this.updateTotalAmount(cart.id); // Cập nhật tổng giá trị giỏ hàng

      return { message: 'Cart cleared successfully' };
    } catch (error) {
      prismaErrorHandler(error); 
    }
  }
}
