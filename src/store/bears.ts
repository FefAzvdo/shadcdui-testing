import { MouseEventHandler } from "react";
import { create } from "zustand";

type State = {
  bears: number;
};

type Action = {
  increasePopulation: MouseEventHandler<HTMLButtonElement>;
  removeAllBears: () => void;
  updateBears: (bears: State["bears"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}));
