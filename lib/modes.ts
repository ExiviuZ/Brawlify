import { GameMode } from '@/types/gamemodes';

export const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

export const familyOf = (name: string) =>
    name
        .replace(/\s+(2v2|5v5|Limbo)$/i, '')
        .replace(/^((Trio|Duo|Solo|Loaded)\s+)+/i, '')
        .trim();

export type ModeFamily = {
    name: string;
    slug: string;
    variants: GameMode[];
    lead: GameMode;
};

export function groupFamilies(modes: GameMode[]): ModeFamily[] {
    const map = new Map<string, GameMode[]>();
    for (const m of modes) {
        if (m.disabled) continue;
        const key = familyOf(m.name);
        map.set(key, [...(map.get(key) ?? []), m]);
    }
    return [...map.entries()]
        .map(([name, list]) => {
            const variants = [...list].sort((a, b) => a.sort1 - b.sort1);
            return { name, slug: slugify(name), variants, lead: variants[0] };
        })
        .sort((a, b) => a.lead.sort1 - b.lead.sort1);
}
