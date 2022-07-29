import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ResponseErrorMsgMapping,
  ResponseErrorType,
} from '@common/constant/response-code.constant';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const { message, code } = ResponseErrorMsgMapping.get(
          ResponseErrorType.SUCCESS,
        );
        return {
          data,
          code,
          message,
          errType: ResponseErrorType.SUCCESS,
        };
      }),
    );
  }
}
