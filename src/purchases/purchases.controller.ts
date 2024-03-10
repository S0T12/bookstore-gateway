import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Controller('purchase')
export class PurchasesController {
  constructor(private readonly purchaseService: PurchasesService) {}

  @Post()
  async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    console.log(
      '🚀 ~ PurchasesController ~ createPurchase ~ createPurchaseDto:',
      createPurchaseDto,
    );
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @Get(':id')
  async getPurchaseById(@Param('id') id: string) {
    const purchase = this.purchaseService.getPurchaseById(id);
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return purchase;
  }

  @Get('user/:userId')
  async getPurchasesByUserId(@Param('userId') userId: string) {
    return this.purchaseService.getPurchasesByUserId(userId);
  }

  @Post(':purchaseId/cart/add')
  async addToCart(
    @Param('purchaseId') purchaseId: string,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.purchaseService.addToCart(purchaseId, addToCartDto);
  }

  @Delete(':purchaseId/cart/remove')
  async removeFromCart(
    @Param('purchaseId') purchaseId: string,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ) {
    return this.purchaseService.removeFromCart(purchaseId, removeFromCartDto);
  }

  @Delete(':purchaseId/cart/clear')
  async clearCart(@Param('purchaseId') purchaseId: string) {
    return this.purchaseService.clearCart(purchaseId);
  }

  @Patch(':id')
  async updatePurchase(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    const updatedPurchase = this.purchaseService.updatePurchase(
      id,
      updatePurchaseDto,
    );
    if (!updatedPurchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return updatedPurchase;
  }

  @Delete(':id')
  async deletePurchaseById(@Param('id') id: string) {
    const deletedPurchase = this.purchaseService.deletePurchaseById(id);
    if (!deletedPurchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return deletedPurchase;
  }
}
