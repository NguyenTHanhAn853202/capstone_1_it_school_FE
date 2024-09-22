import { create } from 'zustand';

const store = {
    username: '',
    token: '',
};

export const useStore = create((set) => ({
    store,
    setUsername: (username) =>
        set((state) => {
            state.username = username;
        }),
}));



