import { create } from 'zustand';

const useStore = create((set) => ({
    orderItems: [],
    setOrderItems: (items) => set({ orderItems: items }),
}));

export default useStore;