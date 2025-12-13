import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface data {
  amount: number;
  source: string;
}

@Injectable()
export class AppService {
  getAllReport(type: ReportType) {
    console.log(type);
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }
   
  createReport(type: ReportType, source: string, amount: number) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, source: string, amount: number) {
    const updatedReportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === type,
    );
    if (updatedReportIndex === -1) {
      return 'Report not found';
    }
    const existingReport = data.report[updatedReportIndex];
    const updatedReport = {
      ...existingReport,
      source,
      amount,
      updated_at: new Date(),
    };
    data.report[updatedReportIndex] = updatedReport;
    return { message: 'Updated', report: updatedReport };
  }

  deleteReport(type: ReportType, id: string) {
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === type,
    );
    if (reportIndex === -1) {
      return 'Report not found';
    }
    data.report.splice(reportIndex, 1);
    return 'Deleted';
  }
}
