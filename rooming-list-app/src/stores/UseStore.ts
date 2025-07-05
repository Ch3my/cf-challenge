import { create } from 'zustand';

// 1. Define the interface for your store's state and actions
interface BearState {
  apiToken: string;
  setApiToken: (newVal: string) => void;
}

// 2. Use the interface with `create<BearState>`
const useStore = create<BearState>((set) => ({
  apiToken: "",
  setApiToken: (newVal: string) => set({ apiToken: newVal }),
}));

export default useStore;