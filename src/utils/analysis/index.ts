import { DataSet } from '../../types/data';
import { DatasetSummary } from './types';
import { calculateCompleteness } from './completeness';
import { generateInsights } from './insights';
import { generateWarnings } from './warnings';

export function calculateDatasetSummary(dataset: DataSet): DatasetSummary {
  return {
    totalRecords: dataset.data.length,
    totalColumns: dataset.columns.length,
    completeness: calculateCompleteness(dataset),
    insights: generateInsights(dataset),
    warnings: generateWarnings(dataset)
  };
}

export * from './types';