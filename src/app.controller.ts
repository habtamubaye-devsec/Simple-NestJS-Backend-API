import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("report/:type")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/income")
  getAllIncomeReport(){
    return []
  }

  @Get(":id")
  getAllIncomeReportById() {
    return {};
  }

  @Post()
  createReports() {
    return "Created"
  }

  @Put(':id')
  updateReports() {
    return "Updated"
  }

  @Delete(":id")
  deleteReports() {
    return "Deleted"
  }
}
