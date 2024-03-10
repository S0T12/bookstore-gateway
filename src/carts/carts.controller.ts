import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from '../purchases/dto/add-to-cart.dto';
import { RemoveFromCartDto } from '../purchases/dto/remove-from-cart.dto';

@Controller('cart')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Post(':purchaseId/add')
  async addToCart(
    @Param('purchaseId') purchaseId: string,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(purchaseId, addToCartDto);
  }

  @Get('getCart/:userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete(':userId/remove')
  async removeFromCart(
    @Param('userId') userId: string,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ) {
    return this.cartService.removeFromCart(userId, removeFromCartDto);
  }

  @Delete(':userId/clear')
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
