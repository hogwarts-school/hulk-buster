import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gender, UserEntity } from '../schema/mysql/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlDB } from '@common/constant/db.constant';
import {
  PrivateUserInfo,
  PublicUserInfo,
  UserInfo,
} from '@src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRegistryReqDto } from '@src/user/dto/user-registry.dto';
import { BusinessException } from '@common/exception/business-exception';
import { ResponseErrorType } from '@common/constant/response-code.constant';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { JwtPayload } from '@common/typings/types';
import { omit } from 'lodash';
import { map } from 'modern-async';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, MysqlDB.HulkBuster)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserInfo | null> {
    const findParams = {
      username,
      password: await this.appConfigService.uglifyUserPassword(password),
    };

    const user = await this.userRepo.findOne({
      where: findParams,
    });
    if (user) {
      return await this.getUserInfo(user.id);
    }
    return null;
  }

  async login({ username, id, ...otherUserInfo }: UserInfo): Promise<UserInfo> {
    const token = this.jwtSign({ username: username, id });

    return {
      ...otherUserInfo,
      id,
      username,
      token,
    };
  }

  async isUserExist(username: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    return Boolean(user);
  }

  async isEmailExist(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    return Boolean(user);
  }

  async registry(body: UserRegistryReqDto): Promise<UserInfo> {
    const { username, password, email } = body;

    if (await this.isUserExist(username)) {
      throw new BusinessException(ResponseErrorType.USER_EXIST);
    }

    if (await this.isEmailExist(email)) {
      throw new BusinessException(ResponseErrorType.EMAIL_EXIST);
    }

    const uglifyPassword = await this.appConfigService.uglifyUserPassword(
      password,
    );

    const userInfo = await this.userRepo.save({
      username,
      password: uglifyPassword,
      email,
      nickname: username,
      gender: Gender.Male,
    });

    return await this.login(userInfo);
  }

  async getUser(userId: number): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });
  }

  async getUserInfo(param: number | UserEntity): Promise<UserInfo> {
    const user = typeof param === 'number' ? await this.getUser(param) : param;

    return omit(user, 'password', 'deleteAt');
  }

  async getPrivateUser(param: number | UserEntity): Promise<PrivateUserInfo> {
    const { id: userId, ...otherInfo } = await this.getUserInfo(param);

    return {
      ...otherInfo,
      userId,
    };
  }

  async getPublicUser(param: number | UserEntity): Promise<PublicUserInfo> {
    const user = await this.getPrivateUser(param);

    return omit(user, 'username', 'dreams', 'token', 'createAt', 'updateAt');
  }

  async getPublicUserMappingByIds(ids: number[]) {
    const users = await map(
      await this.userRepo.findByIds(ids),
      async (user) => {
        const publicUserInfo = await this.getPublicUser(user);

        return [publicUserInfo.userId, publicUserInfo] as const;
      },
    );

    return new Map(users);
  }

  jwtSign(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
