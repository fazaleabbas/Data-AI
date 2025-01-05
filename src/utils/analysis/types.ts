import { Column, DataSet } from '../../types/data';

export interface DatasetSummary {
  totalRecords: number;
  totalColumns: number;
  completeness: number;
  insights: string[];
  warnings: string[];
}

export interface ColumnAnalysis {
  numericColumns: Column[];
  categoricalColumns: Column[];
  dateColumns: Column[];
}