import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dtos';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllReport(type: ReportType): ReportResponseDto[] {
    const reports = data.report.filter((report) => report.type === type);
    return reports.map(report => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto | null {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return null;
    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, body: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto | null {
    const updatedReportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === type,
    );

    console.log(body);
    if (updatedReportIndex === -1) {
      return null;
    }
    const existingReport = data.report[updatedReportIndex];
    const updatedReport = {
      ...existingReport,
      ...body,
      updated_at: new Date(),
    };
    data.report[updatedReportIndex] = updatedReport;
    return new ReportResponseDto(updatedReport);
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
