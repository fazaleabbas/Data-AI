import React from 'react';
import { Filter } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { getUniqueValues } from '../../utils/visualization/filterUtils';

interface ChartFiltersProps {
  columns: string[];
  activeFilters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
}

export const ChartFilters: React.FC<ChartFiltersProps> = ({
  columns,
  activeFilters,
  onFilterChange
}) => {
  const activeDataset = useDataStore((state) => state.activeDataset);

  if (!activeDataset) return null;

  const renderFilterInput = (column: string) => {
    const columnData = activeDataset.columns.find(col => col.name === column);
    if (!columnData) return null;

    const uniqueValues = getUniqueValues(activeDataset.data, column);

    switch (columnData.type) {
      case 'number':
        return (
          <div className="flex gap-2">
            <input
              type="number"
              className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Min"
              value={activeFilters[`${column}_min`] || ''}
              onChange={(e) => {
                onFilterChange({
                  ...activeFilters,
                  [`${column}_min`]: e.target.value
                });
              }}
            />
            <input
              type="number"
              className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Max"
              value={activeFilters[`${column}_max`] || ''}
              onChange={(e) => {
                onFilterChange({
                  ...activeFilters,
                  [`${column}_max`]: e.target.value
                });
              }}
            />
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={activeFilters[column] || ''}
            onChange={(e) => {
              onFilterChange({
                ...activeFilters,
                [column]: e.target.value
              });
            }}
          />
        );

      default:
        return (
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={activeFilters[column] || ''}
            onChange={(e) => {
              onFilterChange({
                ...activeFilters,
                [column]: e.target.value
              });
            }}
          >
            <option value="">All</option>
            {uniqueValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-3">
        <Filter className="w-4 h-4 mr-2 text-blue-600" />
        <h3 className="text-sm font-medium text-gray-700">Filter Data</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map(column => (
          <div key={column} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {column}
            </label>
            {renderFilterInput(column)}
          </div>
        ))}
      </div>
    </div>
  );
};