import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@src/user/schema/mysql/user.entity';

export class UserRegistryReqDto extends PickType(UserEntity, [
  'username',
  'password',
  'email',
] as const) {}
