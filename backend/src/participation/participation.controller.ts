import { Controller, Get } from '@nestjs/common';

@Controller('participations')
export class ParticipationController {
  @Get()
  stub() {
    return { module: 'participations', status: 'stub' };
  }
}
