import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Purchase } from '../purchases/types/purchase.type';
import { AddToCartDto } from '../purchases/dto/add-to-cart.dto';
import { RemoveFromCartDto } from '../purchases/dto/remove-from-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_SERVICE') private readonly cartClientProxy: ClientProxy,
  ) {}

  addToCart(
    purchaseId: string,
    addToCartDto: AddToCartDto,
  ): Observable<Purchase> {
    return this.cartClientProxy.send<Purchase>(
      { cmd: 'addToCart' },
      { purchaseId, ...addToCartDto },
    );
  }

  getCart(userId: string) {
    return this.cartClientProxy.send({ cmd: 'getCartByUserId' }, userId);
  }

  removeFromCart(
    userId: string,
    removeFromCartDto: RemoveFromCartDto,
  ): Observable<Purchase> {
    return this.cartClientProxy.send<Purchase>(
      { cmd: 'removeFromCart' },
      { userId, ...removeFromCartDto },
    );
  }

  clearCart(userId: string): Observable<Purchase> {
    return this.cartClientProxy.send<Purchase>({ cmd: 'clearCart' }, userId);
  }
}
