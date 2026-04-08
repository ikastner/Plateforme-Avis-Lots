import { Controller, Get } from '@nestjs/common';

@Controller('billing')
export class BillingController {
  @Get()
  stub() {
    return { module: 'billing', status: 'stub' };
  }
}
