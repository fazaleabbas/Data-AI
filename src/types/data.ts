export interface DataSet {
  id: string;
  name: string;
  data: any[];
  columns: Column[];
  dateUploaded: Date;
}

export interface Column {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  statistics?: ColumnStatistics;
}

export interface ColumnStatistics {
  min?: number;
  max?: number;
  mean?: number;
  median?: number;
  uniqueValues?: number;
  missingValues?: number;
}