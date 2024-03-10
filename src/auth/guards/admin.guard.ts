import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject('USERS_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const userId = request.body.userId;
    console.log('🚀 ~ AdminGuard ~ canActivate ~ userId:', userId);

    const user = await this.findUserById(userId);
    console.log('🚀 ~ AdminGuard ~ canActivate ~ user:', user);

    if (user && user.role === 'admin') {
      return true;
    }

    throw new UnauthorizedException(
      'Only admin users are allowed to access this resource.',
    );
  }

  private async findUserById(userId: string): Promise<any> {
    try {
      const user = await lastValueFrom(
        this.clientProxy.send({ cmd: 'findOneUser' }, userId),
      );
      return user;
    } catch (error) {
      throw new UnauthorizedException('Error retrieving user information.');
    }
  }
}
