import { Controller } from '@nestjs/common';
import { AppConfigService } from '../service/app-config.service';

@Controller('app-config')
export class UserController {
  constructor(private readonly appConfigService: AppConfigService) {}
}
