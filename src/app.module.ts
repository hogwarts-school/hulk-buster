import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '@common/app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDB } from '@common/constant/db.constant';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: MysqlDB.HulkBuster,
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        ...appConfigService.dbConfig,
        autoLoadEntities: true,
      }),
      inject: [AppConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
