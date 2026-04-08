import { Controller, Get } from '@nestjs/common';

@Controller('audit')
export class AuditController {
  @Get()
  stub() {
    return { module: 'audit', status: 'stub' };
  }
}
