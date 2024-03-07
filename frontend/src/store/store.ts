import { DataClient } from '@/interfaces/DataClient';
import { create } from 'zustand';

type Store = {
  rowsInitial: DataClient[],
  newRows: DataClient[],
  setRowsInitial: (rowsInitial: DataClient[]) => void,
  setNewRows: (newRows: DataClient[]) => void,
  openDialog: boolean,
  setOpenDialog: (openDialog: boolean) => void,
}

export const useStore = create<Store>((set) => ({
  rowsInitial: [],
  newRows: [],
  setRowsInitial: (rowsInitial) => set({ rowsInitial }),
  setNewRows: (newRows) => set({ newRows }),
  openDialog: false,
  setOpenDialog: (openDialog) => set({ openDialog }),
}));