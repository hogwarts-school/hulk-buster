import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { UserService } from '@src/user/service/user.service';
import { JwtPayload } from '@common/typings/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { id, username } = payload;

    const user = await this.userService.getUserInfo(id);

    if (!user || user.username !== username) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
