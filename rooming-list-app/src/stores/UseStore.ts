import { create } from 'zustand';

// 1. Define the interface for your store's state and actions
interface RoomingListState {
  apiToken: string;
  setApiToken: (newVal: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilters: {
    active: boolean;
    closed: boolean;
    canceled: boolean;
  };
  setFilters: (filters: { active: boolean; closed: boolean; canceled: boolean }) => void;
  sortOption: { key: 'cutOffDate'; direction: 'asc' | 'desc' };
  setSortOption: (option: { key: 'cutOffDate'; direction: 'asc' | 'desc' }) => void;
}

const useStore = create<RoomingListState>((set) => ({
  apiToken: "",
  setApiToken: (newVal: string) => set({ apiToken: newVal }),
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  activeFilters: {
    active: false,
    closed: false,
    canceled: false,
  },
  setFilters: (filters) => set({ activeFilters: filters }),
  sortOption: { key: 'cutOffDate', direction: 'asc' },
  setSortOption: (option) => set({ sortOption: option }),
}));

export default useStore;