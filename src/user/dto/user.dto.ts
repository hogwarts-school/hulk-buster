import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '@src/user/schema/mysql/user.entity';

export class UserInfo extends OmitType(UserEntity, ['password'] as const) {}
