import { Column, DataSet } from '../types/data';

export interface CorrelationResult {
  column1: string;
  column2: string;
  coefficient: number;
  strength: 'strong' | 'moderate' | 'weak';
}

export interface Outlier {
  column: string;
  value: number;
  zscore: number;
  rowIndex: number;
}

export function calculateCorrelations(dataset: DataSet): CorrelationResult[] {
  const numericColumns = dataset.columns.filter(col => col.type === 'number');
  const correlations: CorrelationResult[] = [];

  for (let i = 0; i < numericColumns.length; i++) {
    for (let j = i + 1; j < numericColumns.length; j++) {
      const col1 = numericColumns[i].name;
      const col2 = numericColumns[j].name;
      const values1 = dataset.data.map(row => row[col1]);
      const values2 = dataset.data.map(row => row[col2]);
      
      const coefficient = calculatePearsonCorrelation(values1, values2);
      correlations.push({
        column1: col1,
        column2: col2,
        coefficient,
        strength: getCorrelationStrength(coefficient)
      });
    }
  }

  return correlations;
}

export function detectOutliers(dataset: DataSet): Outlier[] {
  const outliers: Outlier[] = [];
  const numericColumns = dataset.columns.filter(col => col.type === 'number');

  numericColumns.forEach(column => {
    const values = dataset.data.map(row => row[column.name]);
    const mean = calculateMean(values);
    const stdDev = calculateStandardDeviation(values, mean);

    values.forEach((value, index) => {
      const zscore = Math.abs((value - mean) / stdDev);
      if (zscore > 3) {
        outliers.push({
          column: column.name,
          value,
          zscore,
          rowIndex: index
        });
      }
    });
  });

  return outliers;
}

function calculateMean(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function calculateStandardDeviation(values: number[], mean: number): number {
  const squareDiffs = values.map(value => Math.pow(value - mean, 2));
  const variance = squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.sqrt(variance);
}

function calculatePearsonCorrelation(x: number[], y: number[]): number {
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);
  
  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;
  
  for (let i = 0; i < x.length; i++) {
    const xDiff = x[i] - meanX;
    const yDiff = y[i] - meanY;
    numerator += xDiff * yDiff;
    denominatorX += xDiff * xDiff;
    denominatorY += yDiff * yDiff;
  }
  
  return numerator / Math.sqrt(denominatorX * denominatorY);
}

function getCorrelationStrength(coefficient: number): 'strong' | 'moderate' | 'weak' {
  const absCoef = Math.abs(coefficient);
  if (absCoef >= 0.7) return 'strong';
  if (absCoef >= 0.3) return 'moderate';
  return 'weak';
}