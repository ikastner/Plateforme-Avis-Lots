import { Controller, Get } from '@nestjs/common';

@Controller('prizes')
export class PrizeController {
  @Get()
  stub() {
    return { module: 'prizes', status: 'stub' };
  }
}
