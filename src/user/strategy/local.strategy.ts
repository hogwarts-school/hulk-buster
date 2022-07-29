import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '@src/user/service/user.service';
import { BusinessException } from '@common/exception/business-exception';
import { ResponseErrorType } from '@common/constant/response-code.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(username, password);

    if (!user) {
      throw new BusinessException(ResponseErrorType.USER_OR_PASSWORD_ERROR);
    }
    return user;
  }
}
