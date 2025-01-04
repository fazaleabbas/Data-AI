import React from 'react';
import { CorrelationMatrix } from './CorrelationMatrix';
import { OutlierDetection } from './OutlierDetection';

export const AnalyticsPanel: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-gray-900">Advanced Analytics</h2>
      <CorrelationMatrix />
      <OutlierDetection />
    </div>
  );
}