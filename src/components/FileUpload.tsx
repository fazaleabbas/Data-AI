import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { read, utils } from 'xlsx';
import Papa from 'papaparse';
import { useDataStore } from '../store/dataStore';
import { inferColumnTypes } from '../utils/dataUtils';

export const FileUpload: React.FC = () => {
  const { addDataset, setActiveDataset } = useDataStore((state) => ({
    addDataset: state.addDataset,
    setActiveDataset: state.setActiveDataset
  }));

  const processFile = async (file: File) => {
    try {
      if (file.name.endsWith('.csv')) {
        Papa.parse(file, {
          complete: (results) => {
            const dataset = {
              id: crypto.randomUUID(),
              name: file.name,
              data: results.data,
              columns: inferColumnTypes(results.data),
              dateUploaded: new Date(),
            };
            addDataset(dataset);
            setActiveDataset(dataset);
          },
          header: true,
        });
      } else {
        const buffer = await file.arrayBuffer();
        const workbook = read(buffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json(worksheet);
        const dataset = {
          id: crypto.randomUUID(),
          name: file.name,
          data,
          columns: inferColumnTypes(data),
          dateUploaded: new Date(),
        };
        addDataset(dataset);
        setActiveDataset(dataset);
      }
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(processFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-lg font-medium text-gray-600">
        {isDragActive ? 'Drop your files here' : 'Drag & drop files here'}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supports CSV and Excel (.xlsx) files
      </p>
    </div>
  );
};