import { create } from 'zustand';
import { PATH_MEDIA } from '~/utils/secret';

const store = {
    username: '',
    token: '',
    login: false,
    avatar: PATH_MEDIA + localStorage.getItem('avatar'),
};

export const useStore = create((set) => ({
    store,
    setUsername: (username) =>
        set((state) => {
            state.username = username;
        }),

    setLogin: () => set((state) => (state.login = true)),
    setAvatar: (avatar) => set((state) => ({ store: { ...state.store, avatar: avatar } })),
}));
