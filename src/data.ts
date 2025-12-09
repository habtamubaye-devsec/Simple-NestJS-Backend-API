const data = {
    report: []
}

interface Data {
    report:{
        id: string;
        source: string;
        amount: number;
        created_at: Data;
        updated_at: Date;
        type: ReportType ;
    }[]
}

enum ReportType{
    INCOME = "income",
    EXPENSE = "expense"
}