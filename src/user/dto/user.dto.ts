import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '@src/user/schema/mysql/user.entity';

export class UserInfo extends OmitType(UserEntity, [
  'password',
  'deleteAt',
] as const) {}

export class PrivateUserInfo extends OmitType(UserInfo, ['id'] as const) {
  userId: number;
}

export class PublicUserInfo extends OmitType(PrivateUserInfo, [
  'username',
  // 'dreams',
  'updateAt',
  'createAt',
  'token',
]) {}
