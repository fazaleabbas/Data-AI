import React, { useState } from 'react';
import { useDataStore } from '../store/dataStore';
import { suggestVisualizations } from '../utils/visualization/chartSelector';
import { ChartCard } from './charts/ChartCard';
import { ChartFilters } from './visualization/ChartFilters';
import { ChartCustomization } from './visualization/ChartCustomization';
import { BarChart } from 'lucide-react';

export const Visualizations: React.FC = () => {
  const activeDataset = useDataStore((state) => state.activeDataset);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [grouping, setGrouping] = useState<string>('');
  const [aggregation, setAggregation] = useState<string>('sum');

  if (!activeDataset) return null;

  const suggestions = suggestVisualizations(activeDataset);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-blue-600" />
          Suggested Visualizations
        </h2>
      </div>

      <ChartFilters
        columns={activeDataset.columns.map(col => col.name)}
        activeFilters={filters}
        onFilterChange={setFilters}
      />

      <ChartCustomization
        onGroupingChange={setGrouping}
        onAggregationChange={setAggregation}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((suggestion, index) => (
          <ChartCard
            key={index}
            type={suggestion.type}
            data={activeDataset.data}
            title={suggestion.title}
            description={suggestion.description}
          />
        ))}
      </div>
    </div>
  );
};