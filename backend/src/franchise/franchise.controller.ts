import { Controller, Get } from '@nestjs/common';

@Controller('franchises')
export class FranchiseController {
  @Get()
  stub() {
    return { module: 'franchises', status: 'stub' };
  }
}
