import React from 'react';
import { Settings } from 'lucide-react';

interface ChartCustomizationProps {
  onGroupingChange: (grouping: string) => void;
  onAggregationChange: (aggregation: string) => void;
}

export const ChartCustomization: React.FC<ChartCustomizationProps> = ({
  onGroupingChange,
  onAggregationChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-3">
        <Settings className="w-4 h-4 mr-2 text-blue-600" />
        <h3 className="text-sm font-medium text-gray-700">Customize View</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group By
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => onGroupingChange(e.target.value)}
          >
            <option value="">None</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aggregation
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => onAggregationChange(e.target.value)}
          >
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            <option value="count">Count</option>
            <option value="min">Minimum</option>
            <option value="max">Maximum</option>
          </select>
        </div>
      </div>
    </div>
  );
};