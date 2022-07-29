import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessException } from '@common/exception/business-exception';
import { ResponseErrorType } from '@common/constant/response-code.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    // 在这里添加自定义的认证逻辑
    // 例如调用 super.logIn(request) 来建立一个session
    return super.canActivate(context);
  }

  handleRequest(err, user, info): any {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new BusinessException(ResponseErrorType.TOKEN_EXPIRED);
    }
    return user;
  }
}
