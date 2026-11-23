'use client';

import { Heart } from 'lucide-react';
import { useFavoriteStore } from '@/app/stores/favorite-store';

interface FavoriteButtonProps {
    id: number | string;
}

export default function FavoriteButton({ id }: FavoriteButtonProps) {
    const isFavorite = useFavoriteStore(state => state.isFavorite(id));
    const toggle = useFavoriteStore(state => state.toggle);

    return (
        <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            className={`mt-6 inline-flex w-max items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-[15px] font-bold transition-all hover:-translate-y-0.5 active:translate-y-1 cursor-pointer ${
                isFavorite
                    ? 'text-white bg-rose-500/20 border-3 border-rose-500 shadow-[0_5px_0_#FF2056]/60 hover:shadow-[0_7px_0_#FF2056]/60 active:shadow-[0_1px_0_#FF2056]/60'
                    : 'text-white/80 bg-background/60 border-3 border-line shadow-[0_5px_0_#2b3063] hover:border-rose-500/60 hover:text-white hover:shadow-[0_7px_0_#FF2056]/40 active:shadow-[0_1px_0_#2b3063]'
            }`}
            onClick={e => {
                e.preventDefault();
                toggle(id);
            }}>
            <Heart
                size={22}
                strokeWidth={2.4}
                className={
                    isFavorite
                        ? 'fill-rose-500 text-rose-500 transition-colors'
                        : 'text-foreground/80 hover:text-foreground transition-colors'
                }
            />
            {isFavorite ? 'Added to favorites' : 'Add to favorites'}
        </button>
    );
}
