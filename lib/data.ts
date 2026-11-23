import { cacheLife } from 'next/cache';
import apiFetch from '@/lib/api';
import { Brawler } from '@/types/brawler';

export async function getBrawlers() {
    'use cache';
    cacheLife('hours');
    const { list } = await apiFetch<{ list: Brawler[] }>('/brawlers');
    return list; // newest first
}

// Only the counts leave this function, so the cache holds three numbers,
// not 1,300 maps.
export async function getCounts() {
    'use cache';
    cacheLife('hours');
    const [maps, modes, icons] = await Promise.all([
        apiFetch<{ list: unknown[] }>('/maps'),
        apiFetch<{ list: unknown[] }>('/gamemodes'),
        apiFetch<{ player: Record<string, unknown> }>('/icons'),
    ]);
    return {
        maps: maps.list.length,
        modes: modes.list.length,
        icons: Object.keys(icons.player).length, // keyed by id, not an array
    };
}
