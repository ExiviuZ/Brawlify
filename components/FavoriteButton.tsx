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
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                toggle(id);
            }}
            aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            aria-pressed={isFavorite}
            className="size-11 border border-line rounded-full bg-background/60 backdrop-blur-sm grid place-items-center transition-all hover:scale-105 active:scale-95 cursor-pointer">
            <Heart
                size={22}
                strokeWidth={2.4}
                className={
                    isFavorite
                        ? 'fill-rose-500 text-rose-500 transition-colors'
                        : 'text-foreground/80 hover:text-foreground transition-colors'
                }
            />
        </button>
    );
}
