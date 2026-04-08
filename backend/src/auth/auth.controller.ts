import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  stub() {
    return { module: 'auth', status: 'stub' };
  }
}
