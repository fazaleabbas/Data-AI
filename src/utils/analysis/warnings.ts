import { DataSet } from '../../types/data';

export function generateWarnings(dataset: DataSet): string[] {
  const warnings: string[] = [];

  // Missing values warnings
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

  // Data quality warnings
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