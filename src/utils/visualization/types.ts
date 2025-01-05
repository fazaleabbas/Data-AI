export type ChartType = 
  | 'bar' 
  | 'line' 
  | 'scatter' 
  | 'pie' 
  | 'histogram' 
  | 'heatmap' 
  | 'boxplot' 
  | 'area' 
  | 'bubble' 
  | 'treemap';

export interface ChartSuggestion {
  type: ChartType;
  columns: string[];
  title: string;
  description: string;
  suitabilityScore: number;
}

export interface ChartConfig {
  type: ChartType;
  data: any;
  options: any;
}