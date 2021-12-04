import create from 'zustand';

const useStore = create(set => ({
    search: "",
    results: "",
}))