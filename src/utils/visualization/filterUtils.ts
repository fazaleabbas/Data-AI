import { DataSet } from '../../types/data';

export function getUniqueValues(data: any[], column: string): any[] {
  const values = new Set(data.map(row => row[column]));
  return Array.from(values)
    .filter(value => value != null)
    .sort((a, b) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      }
      return a - b;
    });
}

export function applyFilters(data: any[], filters: Record<string, any>): any[] {
  return data.filter(row => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      
      if (key.endsWith('_min')) {
        const actualKey = key.replace('_min', '');
        return row[actualKey] >= value;
      }
      
      if (key.endsWith('_max')) {
        const actualKey = key.replace('_max', '');
        return row[actualKey] <= value;
      }
      
      return row[key] === value;
    });
  });
}