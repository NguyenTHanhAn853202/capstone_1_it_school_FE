import {create} from 'zustand'



export const useToggleMode = create((set)=>({
    darkMode: false,
    toggleDarkMode: ()=> set(state=>({darkMode:!state.darkMode}))
}))