import { cacheLife } from 'next/cache';
import apiFetch from '@/lib/api';
import { Brawler } from '@/types/brawler';
import { GameMode } from '@/types/gamemodes';
import { MapsResponse } from '@/types/maps';

export async function getBrawlers() {
    'use cache';
    cacheLife('hours');
    const { list } = await apiFetch<{ list: Brawler[] }>('/brawlers');
    return list; // newest first
}

export async function getGameModes() {
    'use cache';
    cacheLife('hours');
    const { list } = await apiFetch<{ list: GameMode[] }>('/gamemodes');
    return list;
}

export async function getAllMaps() {
    'use cache';
    cacheLife('hours');
    const { list } = await apiFetch<MapsResponse>('/maps');
    return list;
}

// Only 3 maps and one number are cached, not the whole 1,300-entry list.
export async function getFeaturedMaps() {
    'use cache';
    cacheLife('hours');
    const { list } = await apiFetch<MapsResponse>('/maps');

    const active = list.filter(m => !m.disabled);
    const fresh = active.filter(m => m.new);
    // Prefer maps flagged new, otherwise the highest ids (the list is ascending)
    const pool = fresh.length >= 3 ? fresh : active;
    const maps = pool.slice(-3).reverse();

    return { maps, total: list.length };
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
