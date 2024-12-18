import { create } from 'zustand';
import inputOnlyNumber from '~/utils/inputOnlyNumber';

const initState = {
    title: '',
    description: '',
    price: '',
    level: '',
    thumbnail: '',
    categoryId: '',
};
const numberRegex = /^\d+$/;

const handlePrice = (value, state) => {
    if (numberRegex.test(value)) return { course: { ...state.course, price: value ? +value : 0 } };
    return state;
};

export const useCourse = create((set) => ({
    course: initState,
    updateTitle: (value) => set((state) => ({ course: { ...state.course, title: value } })),
    updateDescription: (value) => set((state) => ({ course: { ...state.course, description: value } })),
    updateLevel: (value) => set((state) => ({ course: { ...state.course, level: value } })),
    updateThumbnail: (value) => set((state) => ({ course: { ...state.course, thumbnail: value } })),
    updatePrice: (value) => set((state) => handlePrice(value, state)),
    updateCategory: (value) => set((state) => ({ course: { ...state.course, categoryId: value } })),
    clear: () => set(() => ({ course: initState })),
}));
