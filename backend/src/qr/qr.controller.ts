import { Controller, Get } from '@nestjs/common';

@Controller('qr-tokens')
export class QrController {
  @Get()
  stub() {
    return { module: 'qr-tokens', status: 'stub' };
  }
}
