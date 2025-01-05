import { DataSet } from '../../types/data';
import { analyzeColumns } from './columnAnalysis';

export function generateInsights(dataset: DataSet): string[] {
  const insights: string[] = [];
  const { numericColumns, categoricalColumns, dateColumns } = analyzeColumns(dataset);

  // Basic dataset insights
  insights.push(`This dataset contains ${dataset.data.length} records with ${dataset.columns.length} columns.`);
  
  // Column type distribution
  insights.push(
    `Column composition: ${numericColumns.length} numeric, ${categoricalColumns.length} categorical, and ${dateColumns.length} date columns.`
  );

  // Numeric column insights
  numericColumns.forEach(column => {
    if (column.statistics) {
      insights.push(
        `${column.name}: ranges from ${column.statistics.min} to ${column.statistics.max} with an average of ${column.statistics.mean?.toFixed(2)}.`
      );
    }
  });

  // Categorical column insights
  categoricalColumns.forEach(column => {
    if (column.statistics?.uniqueValues) {
      insights.push(
        `${column.name}: contains ${column.statistics.uniqueValues} unique values.`
      );
    }
  });

  return insights;
}