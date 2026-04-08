import { Controller, Get } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  @Get()
  stub() {
    return { module: 'stats', status: 'stub' };
  }
}
