import React from 'react';
import { useDataStore } from '../../store/dataStore';
import { detectOutliers } from '../../utils/statisticsUtils';

export const OutlierDetection: React.FC = () => {
  const activeDataset = useDataStore((state) => state.activeDataset);

  if (!activeDataset) return null;

  const outliers = detectOutliers(activeDataset);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Outlier Detection</h3>
      {outliers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Z-Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {outliers.map((outlier, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-900">{outlier.column}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{outlier.value}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{outlier.zscore.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No significant outliers detected.</p>
      )}
    </div>
  );
}