import React from 'react';
import { useDataStore } from '../../store/dataStore';
import { calculateDatasetSummary } from '../../utils/analysis';
import { FileText, TrendingUp, AlertTriangle } from 'lucide-react';

export const DataSummary: React.FC = () => {
  const activeDataset = useDataStore((state) => state.activeDataset);

  if (!activeDataset) return null;

  const summary = calculateDatasetSummary(activeDataset);

  return (
    <div className="mb-8 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Dataset Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Records</p>
            <p className="text-2xl font-bold text-blue-700">{summary.totalRecords}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Columns</p>
            <p className="text-2xl font-bold text-green-700">{summary.totalColumns}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Data Completeness</p>
            <p className="text-2xl font-bold text-purple-700">{summary.completeness}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Key Insights
        </h3>
        <div className="space-y-4">
          {summary.insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-gray-800">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {summary.warnings.length > 0 && (
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
            Data Quality Warnings
          </h3>
          <ul className="space-y-2">
            {summary.warnings.map((warning, index) => (
              <li key={index} className="flex items-center text-yellow-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};