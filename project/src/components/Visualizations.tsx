import React from 'react';
import { useDataStore } from '../store/dataStore';
import { suggestCharts, prepareChartData } from '../utils/chartUtils';
import { ChartCard } from './charts/ChartCard';

export const Visualizations: React.FC = () => {
  const activeDataset = useDataStore((state) => state.activeDataset);

  if (!activeDataset) {
    return null;
  }

  const suggestions = suggestCharts(activeDataset);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Suggested Visualizations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((suggestion, index) => (
          <ChartCard
            key={index}
            type={suggestion.type}
            data={prepareChartData(activeDataset, suggestion.columns)}
            title={suggestion.title}
            description={suggestion.description}
          />
        ))}
      </div>
    </div>
  );
};