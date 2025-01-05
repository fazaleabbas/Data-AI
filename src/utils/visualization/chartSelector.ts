import { DataSet, Column } from '../../types/data';
import { ChartType, ChartSuggestion } from './types';
import { analyzeColumns } from '../analysis/columnAnalysis';

function calculateSuitabilityScore(
  chartType: ChartType,
  columns: Column[],
  dataSize: number
): number {
  let score = 0;
  
  switch (chartType) {
    case 'bar':
      score += columns.some(c => c.type === 'string') ? 2 : 0;
      score += columns.some(c => c.type === 'number') ? 2 : 0;
      score += dataSize <= 50 ? 1 : 0;
      break;
    case 'line':
      score += columns.some(c => c.type === 'date') ? 3 : 0;
      score += columns.some(c => c.type === 'number') ? 2 : 0;
      score += dataSize >= 10 ? 1 : 0;
      break;
    case 'scatter':
      score += columns.filter(c => c.type === 'number').length >= 2 ? 3 : 0;
      break;
    case 'pie':
      score += columns.some(c => c.type === 'string') ? 2 : 0;
      score += dataSize <= 10 ? 2 : 0;
      break;
    // Add more chart type scoring logic
  }
  
  return score;
}

export function suggestVisualizations(dataset: DataSet): ChartSuggestion[] {
  const { numericColumns, categoricalColumns, dateColumns } = analyzeColumns(dataset);
  const suggestions: ChartSuggestion[] = [];

  // Bar charts for categorical vs numeric
  categoricalColumns.forEach(catCol => {
    numericColumns.forEach(numCol => {
      const score = calculateSuitabilityScore('bar', [catCol, numCol], dataset.data.length);
      suggestions.push({
        type: 'bar',
        columns: [catCol.name, numCol.name],
        title: `${numCol.name} by ${catCol.name}`,
        description: `Distribution of ${numCol.name} across different ${catCol.name} categories`,
        suitabilityScore: score
      });
    });
  });

  // Line charts for temporal data
  dateColumns.forEach(dateCol => {
    numericColumns.forEach(numCol => {
      const score = calculateSuitabilityScore('line', [dateCol, numCol], dataset.data.length);
      suggestions.push({
        type: 'line',
        columns: [dateCol.name, numCol.name],
        title: `${numCol.name} Trend Over Time`,
        description: `Time series analysis of ${numCol.name}`,
        suitabilityScore: score
      });
    });
  });

  // Scatter plots for numeric correlations
  for (let i = 0; i < numericColumns.length - 1; i++) {
    for (let j = i + 1; j < numericColumns.length; j++) {
      const score = calculateSuitabilityScore('scatter', 
        [numericColumns[i], numericColumns[j]], 
        dataset.data.length
      );
      suggestions.push({
        type: 'scatter',
        columns: [numericColumns[i].name, numericColumns[j].name],
        title: `${numericColumns[i].name} vs ${numericColumns[j].name}`,
        description: `Correlation analysis between ${numericColumns[i].name} and ${numericColumns[j].name}`,
        suitabilityScore: score
      });
    }
  }

  return suggestions.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}