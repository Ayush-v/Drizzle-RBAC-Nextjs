import { create } from "zustand";

interface NavbarState {
  open: boolean;
  toggle: () => void;
}

export const useNavbarState = create<NavbarState>((set) => ({
  open: true,
  toggle: () => set((state) => ({ open: !state.open })),
}));
