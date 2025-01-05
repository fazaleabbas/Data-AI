import { Column, DataSet } from '../../types/data';
import { ColumnAnalysis } from './types';

export function analyzeColumns(dataset: DataSet): ColumnAnalysis {
  return {
    numericColumns: dataset.columns.filter(col => col.type === 'number'),
    categoricalColumns: dataset.columns.filter(col => col.type === 'string'),
    dateColumns: dataset.columns.filter(col => col.type === 'date')
  };
}