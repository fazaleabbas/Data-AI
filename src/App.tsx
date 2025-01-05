import React from 'react';
import { FileUpload } from './components/FileUpload';
import { DataSummary } from './components/analysis/DataSummary';
import { DataPreview } from './components/DataPreview';
import { Visualizations } from './components/Visualizations';
import { AnalyticsPanel } from './components/analytics/AnalyticsPanel';
import { BarChart3 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">DataViz AI</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Upload Your Data
            </h2>
            <FileUpload />
          </div>

          <DataSummary />

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Data Preview
            </h2>
            <DataPreview />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Visualizations />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <AnalyticsPanel />
        </div>
      </main>
    </div>
  );
}

export default App;