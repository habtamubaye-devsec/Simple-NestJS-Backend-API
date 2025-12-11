import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllIncomeReport(@Param('type') type: string) {
    console.log(type);
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getAllIncomeReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    console.log(id, type);
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReports(@Body() body: { amount: number; source: string }, @Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };
    data.report.push(newReport);

    return 'Created';
  }

  @Put(':id')
  updateReports(@Body() body: { amount: number; source: string }, @Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const updatedReportIndex = data.report.findIndex((report => report.id === id && report.type === reportType));
    if (updatedReportIndex === -1) {
      return 'Report not found';
    }
    const existingReport = data.report[updatedReportIndex];
    const updatedReport = {
      ...existingReport,
      source: body.source,
      amount: body.amount,
      updated_at: new Date(),
    };
    data.report[updatedReportIndex] = updatedReport;
    return 'Updated';
  }

  @Delete(':id')
  deleteReports(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportIndex = data.report.findIndex((report) => report.id === id && report.type === reportType);
    if (reportIndex === -1) {
      return 'Report not found';
    }
    data.report.splice(reportIndex, 1);
    return 'Deleted';
  }
}
