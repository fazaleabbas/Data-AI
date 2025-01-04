import { Column, DataSet } from '../types/data';

type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'histogram';

interface ChartSuggestion {
  type: ChartType;
  columns: string[];
  title: string;
  description: string;
}

export function suggestCharts(dataset: DataSet): ChartSuggestion[] {
  const suggestions: ChartSuggestion[] = [];
  const numericColumns = dataset.columns.filter(col => col.type === 'number');
  const categoricalColumns = dataset.columns.filter(col => col.type === 'string');
  const dateColumns = dataset.columns.filter(col => col.type === 'date');

  // Bar charts for categorical vs numeric
  categoricalColumns.forEach(catCol => {
    numericColumns.forEach(numCol => {
      suggestions.push({
        type: 'bar',
        columns: [catCol.name, numCol.name],
        title: `${numCol.name} by ${catCol.name}`,
        description: `Compare ${numCol.name} across different ${catCol.name} categories`
      });
    });
  });

  // Line charts for date vs numeric
  dateColumns.forEach(dateCol => {
    numericColumns.forEach(numCol => {
      suggestions.push({
        type: 'line',
        columns: [dateCol.name, numCol.name],
        title: `${numCol.name} over Time`,
        description: `Track ${numCol.name} changes over time`
      });
    });
  });

  // Scatter plots for numeric vs numeric
  for (let i = 0; i < numericColumns.length; i++) {
    for (let j = i + 1; j < numericColumns.length; j++) {
      suggestions.push({
        type: 'scatter',
        columns: [numericColumns[i].name, numericColumns[j].name],
        title: `${numericColumns[i].name} vs ${numericColumns[j].name}`,
        description: `Explore relationship between ${numericColumns[i].name} and ${numericColumns[j].name}`
      });
    }
  }

  return suggestions;
}

export function prepareChartData(dataset: DataSet, columns: string[]) {
  const data = dataset.data;
  
  if (columns.length === 1) {
    return data.map(row => row[columns[0]]);
  }
  
  return data.map(row => ({
    x: row[columns[0]],
    y: row[columns[1]]
  }));
}