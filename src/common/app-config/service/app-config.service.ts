import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { MysqlDB } from '@common/constant/db.constant';
import * as CryptoJs from 'crypto-js';

@Injectable()
class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port() {
    return Number(this.configService.get<number>('PORT'));
  }

  get dbConfig(): MysqlConnectionOptions {
    return {
      type: 'mysql',
      name: MysqlDB.HulkBuster,
      host: this.configService.get<string>('TYPEORM_HOST'),
      port: this.configService.get<number>('TYPEORM_PORT'),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('TYPEORM_PASSWORD'),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      synchronize: false,
    };
  }

  get jwtSecret() {
    return this.configService.get<string>('JWT_SECRET');
  }

  get userPasswordSecret() {
    return this.configService.get<string>('USER_PASSWORD_SECRET');
  }

  uglifyUserPassword(password: string) {
    return CryptoJs.MD5(`${password}.${this.userPasswordSecret}`).toString();
  }
}

export { AppConfigService };
