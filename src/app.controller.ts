import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReport(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReport(reportType);
  }

  @Get(':id')
  getAllReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReports(
    @Body() body: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    
    return this.appService.createReport(reportType, body.source, body.amount);
  }

  @Put(':id')
  updateReports(
    @Body() body: { amount: number; source: string },
    @Param('type') type: string,
    @Param('id') id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(reportType, id, body.source, body.amount);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReports(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
   return this.appService.deleteReport(reportType, id);
  }
}
