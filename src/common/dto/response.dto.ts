import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { ResponseErrorType } from '@common/constant/response-code.constant';

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @IsArray()
  @ApiProperty({ isArray: true })
  @ValidateNested({ each: true })
  data: TData[];

  constructor(data: TData[]) {
    this.data = data;
  }
}

export class AbstractResponseDto<T> {
  /**
   * 异常码
   */
  code: number;

  @ApiProperty({
    enum: ResponseErrorType,
    type: 'enum',
    enumName: 'ResponseErrorType',
    description: '异常码类型',
  })
  errType: ResponseErrorType;

  @ValidateNested()
  data: T;

  @ApiProperty()
  message: string;
}
