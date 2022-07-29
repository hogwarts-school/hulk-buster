import { UserAbstractEntity } from '@common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export const UserEntityTable = 'user';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

@Entity({ name: UserEntityTable })
export class UserEntity extends UserAbstractEntity {
  /**
   * 用户名
   */
  @Column({ type: 'varchar', length: 18, comment: '用户名' })
  username: string;

  /**
   * 密码
   */
  @Column({ type: 'varchar', length: 200, select: false, comment: '密码' })
  password: string;

  /**
   * 邮箱
   */
  @ApiProperty({ description: '邮箱' })
  @Column({ type: 'varchar', length: 24, comment: '邮箱' })
  email: string;

  /**
   * 昵称
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: '昵称',
  })
  nickname: string;

  /**
   * 性别
   */
  @Column({
    type: 'enum',
    enum: Gender,
    comment: '性别',
  })
  @ApiProperty({
    enum: Gender,
    type: 'enum',
    description: '性别',
    enumName: 'Gender',
  })
  gender: Gender;

  /**
   * token
   */
  token: string;
}
