import { Controller, Get } from '@nestjs/common';

@Controller('restaurants')
export class RestaurantController {
  @Get()
  stub() {
    return { module: 'restaurants', status: 'stub' };
  }
}
