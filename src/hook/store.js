import { create } from 'zustand';

const store = {
    username: '',
    token: '',
    login: false,
};

export const useStore = create((set) => ({
    store,
    setUsername: (username) =>
        set((state) => {
            state.username = username;
        }),

    setLogin: () => set((state) => (state.login = true)),
}));
