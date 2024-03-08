import { DataClient } from '@/interfaces/DataClient';
import { create } from 'zustand';

type Store = {
  rowsInitial: DataClient[],
  newRows: DataClient[],
  setRowsInitial: (rowsInitial: DataClient[]) => void,
  setNewRows: (newRows: DataClient[]) => void,
  openDialog: boolean,
  setOpenDialog: (openDialog: boolean) => void,
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  dataEdit: DataClient | null;
  setDataEdit: (dataEdit: DataClient | null) => void;
  actionSuccess: boolean;
  setActionSuccess: (actionSuccess: boolean) => void;
  messageAlertClient: string;
  setMessageAlertClient: (messageAlertClient: string) => void;
  actionError: boolean;
  setActionError: (actionError: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  rowsInitial: [],
  newRows: [],
  setRowsInitial: (rowsInitial) => set({ rowsInitial }),
  setNewRows: (newRows) => set({ newRows }),
  openDialog: false,
  setOpenDialog: (openDialog) => set({ openDialog }),
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
  dataEdit: null,
  setDataEdit: (dataEdit) => set({ dataEdit }),
  actionSuccess: false,
  setActionSuccess: (actionSuccess) => set({ actionSuccess }),
  messageAlertClient: '',
  setMessageAlertClient: (messageAlertClient) => set({ messageAlertClient }),
  actionError: false,
  setActionError: (actionError) => set({ actionError }),
}));