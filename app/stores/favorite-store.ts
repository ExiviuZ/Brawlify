import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoriteState = {
    favoriteBrawlers: number[];
    toggle: (id: number | string) => void;
    isFavorite: (id: number | string) => boolean;
};

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => ({
            favoriteBrawlers: [],

            toggle: id =>
                set(state => {
                    const numId = Number(id);
                    const current = state.favoriteBrawlers.map(Number);
                    const exists = current.includes(numId);
                    return {
                        favoriteBrawlers: exists
                            ? current.filter(item => item !== numId)
                            : [...current, numId],
                    };
                }),

            isFavorite: id => {
                const numId = Number(id);
                return get().favoriteBrawlers.some(item => Number(item) === numId);
            },
        }),
        {
            name: 'favorite-brawlers', // localStorage key
        },
    ),
);
