import { create } from 'zustand';
import { DataSet } from '../types/data';

interface DataStore {
  datasets: DataSet[];
  activeDataset: DataSet | null;
  setActiveDataset: (dataset: DataSet) => void;
  addDataset: (dataset: DataSet) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  datasets: [],
  activeDataset: null,
  setActiveDataset: (dataset) => set({ activeDataset: dataset }),
  addDataset: (dataset) => 
    set((state) => ({ datasets: [...state.datasets, dataset] })),
}));