import { Column } from '../types/data';

export function inferColumnTypes(data: any[]): Column[] {
  if (!data.length) return [];
  
  const sample = data[0];
  const columns: Column[] = [];

  Object.keys(sample).forEach(key => {
    const values = data.map(row => row[key]).filter(val => val != null);
    let type: Column['type'] = 'string';

    if (values.length > 0) {
      const firstValue = values[0];
      if (typeof firstValue === 'number' || !isNaN(Number(firstValue))) {
        type = 'number';
      } else if (firstValue instanceof Date || !isNaN(Date.parse(firstValue))) {
        type = 'date';
      } else if (typeof firstValue === 'boolean') {
        type = 'boolean';
      }
    }

    columns.push({
      name: key,
      type,
      statistics: calculateStatistics(values, type),
    });
  });

  return columns;
}

function calculateStatistics(values: any[], type: Column['type']): Column['statistics'] {
  if (type === 'number') {
    const numbers = values.map(v => Number(v)).filter(v => !isNaN(v));
    return {
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      mean: numbers.reduce((a, b) => a + b, 0) / numbers.length,
      median: getMedian(numbers),
      uniqueValues: new Set(numbers).size,
      missingValues: values.length - numbers.length,
    };
  }

  return {
    uniqueValues: new Set(values).size,
    missingValues: values.filter(v => v == null).length,
  };
}

function getMedian(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}