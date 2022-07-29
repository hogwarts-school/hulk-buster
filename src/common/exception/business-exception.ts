import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ResponseErrorMsgMapping,
  ResponseErrorType,
} from '@common/constant/response-code.constant';

export class BusinessException extends HttpException {
  constructor(errType: ResponseErrorType, statusCode: number = HttpStatus.OK) {
    const { message, code } = ResponseErrorMsgMapping.get(errType);

    const errorJson = JSON.stringify({ code, message, errType });

    super(errorJson, statusCode);
  }
}
