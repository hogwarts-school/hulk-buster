import { Controller, Get } from '@nestjs/common';
import { AppConfigService } from '../service/app-config.service';

@Controller('app-config')
export class UserController {
  constructor(private readonly appConfigService: AppConfigService) {}

  @Get('error-code')
  getResponseErrorCode() {}
}
