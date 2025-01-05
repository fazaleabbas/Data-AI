import { DataSet } from '../../types/data';

export function calculateCompleteness(dataset: DataSet): number {
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