const { create } = require('zustand');

const initState = {
    id: Date.now(),
    title: '',
    description: '',
    video: '',
    assignment: '',
    interactionAssignment: '',
    thumbnail: '',
};

const addLesson = (index, state) => {
    const lessons = state.lessons;
    lessons.splice(index + 1, 0, {
        id: Date.now(),
        title: '',
        description: '',
        video: '',
        assignment: '',
        interactionAssignment: '',
        thumbnail: '',
    });
    const newLessons = [...lessons];
    return { lessons: newLessons };
};

// const removeLesson = (index, state) => {
//     const lessons = state.lessons;
//     // if(index === 0) lessons.shift()
//     lessons.splice(index, 1);
//     return { lessons: lessons };
// };

export const useLesson = create((set) => ({
    lessons: [initState],
    addLesson: (index) => set((state) => addLesson(index, state)),
    updateLesson: (index, updatedFields) =>
        set((state) => ({
            lessons: state.lessons.map((lesson, i) => (i === index ? { ...lesson, ...updatedFields } : lesson)),
        })),
    removeLesson: (index) =>
        set((state) => {
            if (state.lessons.length === 1) return state;
            else
                return {
                    lessons: state.lessons.filter((_, i) => i !== index),
                };
        }),
    clearLessons: () =>
        set({
            lessons: [
                {
                    id: Date.now(),
                    title: '',
                    description: '',
                    video: '',
                    assignment: '',
                    interactionAssignment: '',
                    thumbnail: '',
                },
            ],
        }),
}));
