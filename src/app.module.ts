import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { PurchasesModule } from './purchases/purchases.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [BooksModule, UsersModule, PurchasesModule, CartsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
