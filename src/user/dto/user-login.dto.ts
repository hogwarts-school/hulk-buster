import { PickType } from '@nestjs/swagger';
import { UserInfo } from '@src/user/dto/user.dto';
import { UserEntity } from '@src/user/schema/mysql/user.entity';

export class UserLoginReqDto extends PickType(UserEntity, [
  'username',
  'password',
] as const) {}

export class UserLoginResDto extends UserInfo {}
