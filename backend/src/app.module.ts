import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { FranchiseModule } from './franchise/franchise.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CampaignModule } from './campaign/campaign.module';
import { PrizeModule } from './prize/prize.module';
import { QrModule } from './qr/qr.module';
import { ParticipationModule } from './participation/participation.module';
import { StatsModule } from './stats/stats.module';
import { BillingModule } from './billing/billing.module';
import { NotificationModule } from './notification/notification.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    FranchiseModule,
    RestaurantModule,
    CampaignModule,
    PrizeModule,
    QrModule,
    ParticipationModule,
    StatsModule,
    BillingModule,
    NotificationModule,
    AuditModule,
  ],
})
export class AppModule {}
