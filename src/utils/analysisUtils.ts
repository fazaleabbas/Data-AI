import { DataSet, Column } from '../types/data';

interface DatasetSummary {
  totalRecords: number;
  totalColumns: number;
  completeness: number;
  insights: string[];
  warnings: string[];
}

export function calculateDatasetSummary(dataset: DataSet): DatasetSummary {
  const totalRecords = dataset.data.length;
  const totalColumns = dataset.columns.length;
  
  // Calculate data completeness
  const completeness = calculateCompleteness(dataset);
  
  // Generate insights
  const insights = generateInsights(dataset);
  
  // Generate warnings
  const warnings = generateWarnings(dataset);
  
  return {
    totalRecords,
    totalColumns,
    completeness,
    insights,
    warnings
  };
}

function calculateCompleteness(dataset: DataSet): number {
  let totalCells = dataset.data.length * dataset.columns.length;
  let nonEmptyCells = 0;

  dataset.data.forEach(row => {
    dataset.columns.forEach(column => {
      if (row[column.name] != null && row[column.name] !== '') {
        nonEmptyCells++;
      }
    });
  });

  return Math.round((nonEmptyCells / totalCells) * 100);
}

function generateInsights(dataset: DataSet): string[] {
  const insights: string[] = [];
  const numericColumns = dataset.columns.filter(col => col.type === 'number');
  const categoricalColumns = dataset.columns.filter(col => col.type === 'string');
  const dateColumns = dataset.columns.filter(col => col.type === 'date');

  // Add basic dataset insights
  insights.push(`This dataset contains ${dataset.data.length} records with ${dataset.columns.length} columns.`);
  
  // Add column type distribution
  insights.push(
    `Column composition: ${numericColumns.length} numeric, ${categoricalColumns.length} categorical, and ${dateColumns.length} date columns.`
  );

  // Add insights for numeric columns
  numericColumns.forEach(column => {
    if (column.statistics) {
      insights.push(
        `${column.name}: ranges from ${column.statistics.min} to ${column.statistics.max} with an average of ${column.statistics.mean?.toFixed(2)}.`
      );
    }
  });

  // Add insights for categorical columns
  categoricalColumns.forEach(column => {
    if (column.statistics?.uniqueValues) {
      insights.push(
        `${column.name}: contains ${column.statistics.uniqueValues} unique values.`
      );
    }
  });

  return insights;
}

function generateWarnings(dataset: DataSet): string[] {
  const warnings: string[] = [];

  // Check for missing values
  dataset.columns.forEach(column => {
    if (column.statistics?.missingValues && column.statistics.missingValues > 0) {
      const percentage = ((column.statistics.missingValues / dataset.data.length) * 100).toFixed(1);
      if (Number(percentage) > 5) {
        warnings.push(
          `${column.name} has ${percentage}% missing values.`
        );
      }
    }
  });

  // Check for potential data quality issues
  dataset.columns.forEach(column => {
    if (column.type === 'number' && column.statistics) {
      const range = column.statistics.max! - column.statistics.min!;
      if (range === 0) {
        warnings.push(
          `${column.name} has no variation (constant value).`
        );
      }
    }
  });

  return warnings;
}