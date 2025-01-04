import React from 'react';
import { useDataStore } from '../../store/dataStore';
import { calculateCorrelations } from '../../utils/statisticsUtils';

export const CorrelationMatrix: React.FC = () => {
  const activeDataset = useDataStore((state) => state.activeDataset);

  if (!activeDataset) return null;

  const correlations = calculateCorrelations(activeDataset);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Correlation Analysis</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variables</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correlation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strength</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {correlations.map((corr, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {corr.column1} vs {corr.column2}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {corr.coefficient.toFixed(3)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${corr.strength === 'strong' ? 'bg-green-100 text-green-800' :
                      corr.strength === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {corr.strength}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}