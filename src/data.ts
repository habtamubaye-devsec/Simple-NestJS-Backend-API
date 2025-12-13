export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Data;
    updated_at: Date;
    type: ReportType;
  }[];
}

export const data = {
  report: [
    {
      id: '494de28c-02e5-4005-b693-df004768456c',
      source: 'Salary',
      amount: 7809,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid2',
      source: 'Youtube',
      amount: 2999,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'd5d261ce-f9ef-4ad2-989d-152ab7bcea12',
      source: 'Food',
      amount: 6588,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};
