import { create } from 'zustand';
import { UserI } from '../types';

type State = {
  count: number;
  currentUser: UserI | null;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
  setUser: (user: UserI) => void;
};

const initialState: State = {
  count: 0,
  currentUser: null,
};

export const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
  setUser: (user: UserI) => set((state) => ({ ...state, currentUser: user })),
}));
