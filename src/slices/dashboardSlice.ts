import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  activeTab: string;
  isModalOpen: boolean;
  modalMode: 'create' | 'edit' | 'view';
  selectedItem: any;
  searchTerm: string;
}

const initialState: DashboardState = {
  activeTab: 'packages',
  isModalOpen: false,
  modalMode: 'create',
  selectedItem: null,
  searchTerm: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    openModal: (state, action: PayloadAction<{ mode: 'create' | 'edit' | 'view'; item?: any }>) => {
      state.modalMode = action.payload.mode;
      state.selectedItem = action.payload.item || null;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedItem = null;
    },
  },
});

export const { setActiveTab, setSearchTerm, openModal, closeModal } = dashboardSlice.actions;
export default dashboardSlice.reducer;
