import { Module } from '@nestjs/common';
import { UserController } from '@src/user/controller/user.controller';
import { UserService } from '@src/user/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@src/user/schema/mysql/user.entity';
import { MysqlDB } from '@common/constant/db.constant';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '@common/app-config/app-config.module';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { JwtStrategy } from '@src/user/strategy/jwt.strategy';
import { LocalStrategy } from '@src/user/strategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity], MysqlDB.HulkBuster),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory(appConfigService: AppConfigService) {
        return {
          secret: appConfigService.jwtSecret,
          signOptions: { expiresIn: '3d' },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, LocalStrategy],
  exports: [UserService],
})
export class UserModule {}
