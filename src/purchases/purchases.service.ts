import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './types/purchase.type';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject('PURCHASE_SERVICE')
    private readonly purchaseClientProxy: ClientProxy,
    @Inject('CART_SERVICE') private readonly cartClientProxy: ClientProxy,
  ) {}

  createPurchase(createPurchaseDto: CreatePurchaseDto): Observable<Purchase> {
    console.log(
      '🚀 ~ PurchasesService ~ createPurchase ~ createPurchaseDto:',
      createPurchaseDto,
    );
    return this.purchaseClientProxy.send<Purchase>(
      { cmd: 'createPurchase' },
      {
        userId: createPurchaseDto.userId,
      },
    );
  }

  getPurchaseById(id: string): Observable<Purchase> {
    return this.purchaseClientProxy.send<Purchase>(
      { cmd: 'getPurchaseById' },
      id,
    );
  }

  getPurchasesByUserId(userId: string): Observable<Purchase[]> {
    return this.purchaseClientProxy.send<Purchase[]>(
      { cmd: 'getPurchasesByUserId' },
      userId,
    );
  }

  addToCart(
    purchaseId: string,
    addToCartDto: AddToCartDto,
  ): Observable<Purchase> {
    return this.cartClientProxy.send<Purchase>(
      { cmd: 'addToCart' },
      { purchaseId, ...addToCartDto },
    );
  }

  removeFromCart(
    purchaseId: string,
    removeFromCartDto: RemoveFromCartDto,
  ): Observable<Purchase> {
    return this.cartClientProxy.send<Purchase>(
      { cmd: 'removeFromCart' },
      { purchaseId, ...removeFromCartDto },
    );
  }

  clearCart(purchaseId: string): Observable<Purchase> {
    return this.cartClientProxy.send<Purchase>(
      { cmd: 'clearCart' },
      purchaseId,
    );
  }

  updatePurchase(
    purchaseId: string,
    data: UpdatePurchaseDto,
  ): Observable<Purchase> {
    return this.purchaseClientProxy.send<Purchase>(
      { cmd: 'updatePurchase' },
      { purchaseId, data },
    );
  }

  deletePurchaseById(id: string): Observable<Purchase> {
    return this.purchaseClientProxy.send<Purchase>(
      { cmd: 'deletePurchaseById' },
      id,
    );
  }
}
