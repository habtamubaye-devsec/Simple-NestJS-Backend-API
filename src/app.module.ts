import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportController } from './report/report.controller';
import { ExpwnseController } from './expwnse/expwnse.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, ReportController, ExpwnseController],
  providers: [AppService],
})
export class AppModule {}
