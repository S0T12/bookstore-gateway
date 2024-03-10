import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcryptjs from 'bcryptjs';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly clientProxy: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserByUsername(username);
    if (user instanceof NotFoundException) {
      return null;
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return null;
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async findUserByUsername(username: string): Promise<any> {
    try {
      const user = await lastValueFrom(
        this.clientProxy.send({ cmd: 'findOneByUsername' }, username),
      );
      return user;
    } catch (error) {
      throw new UnauthorizedException('Error retrieving user information.');
    }
  }
}
