import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './types/user.type';
import { AuthService } from '../auth/auth.service';
import { createUserResponse } from './types/create-user.type';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly clientProxy: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<createUserResponse> {
    const user = await lastValueFrom(
      this.clientProxy.send<User>({ cmd: 'createUser' }, createUserDto),
    );
    console.log('🚀 ~ UsersService ~ create ~ user:', user);

    const token = await this.authService.login(user);
    console.log('🚀 ~ UsersService ~ create ~ token:', token);
    return { user, token };
  }

  findAll(): Observable<User[]> {
    return this.clientProxy.send<User[]>({ cmd: 'findAllUser' }, {});
  }

  async findOneById(id: string): Promise<User | UnauthorizedException> {
    console.log('🚀 ~ UsersService ~ id:', id);

    const result = await lastValueFrom(
      this.clientProxy.send<User>({ cmd: 'findOneUser' }, id),
    );

    console.log('🚀 ~ UsersService ~ result:', result);

    const validation = this.authService.validateUser(
      result.username,
      result.username,
    );

    if (validation) {
      return result;
    }
    return new UnauthorizedException('User is not validation');
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    return this.clientProxy.send<User>(
      { cmd: 'updateUser' },
      { id, ...updateUserDto },
    );
  }

  remove(id: string): Observable<User> {
    return this.clientProxy.send<User>({ cmd: 'removeUser' }, id);
  }
}
