import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(
    @Inject('USERS_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const createUserDto = request.body;
    console.log('🚀 ~ SuperAdminGuard ~ createUserDto:', createUserDto);

    if (createUserDto.role && createUserDto.role === 'admin') {
      const result = await this.checkIfSuperAdmin(createUserDto);
      console.log('🚀 ~ SuperAdminGuard ~ result:', result);
      return result;
    }

    return Promise.resolve(true);
  }

  private async checkIfSuperAdmin(createUserDto): Promise<boolean> {
    try {
      const user = await lastValueFrom(
        this.clientProxy.send({ cmd: 'findOneUser' }, createUserDto.assignedBy),
      );
      console.log('🚀 ~ SuperAdminGuard ~ checkIfSuperAdmin ~ user:', user);

      if (user && user.role === 'superAdmin') {
        createUserDto.assignedBy = user._id;
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking superAdmin:', error);
      return false;
    }
  }
}
