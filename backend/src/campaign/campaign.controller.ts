import { Controller, Get } from '@nestjs/common';

@Controller('campaigns')
export class CampaignController {
  @Get()
  stub() {
    return { module: 'campaigns', status: 'stub' };
  }
}
