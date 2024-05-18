import { create } from 'zustand';

import { UserI } from '../types';

type State = {
  currentUser: UserI | null;
  error: string | null;
};

type Actions = {
  setUser: (user: UserI) => void;
  setError: (error: string) => void;
};

const initialState: State = {
  currentUser: null,
  error: null,
};

export const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  setUser: (user: UserI) => set((state) => ({ ...state, currentUser: user })),
  setError: (error: string) => set((state) => ({ ...state, error })),
}));
