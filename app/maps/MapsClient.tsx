'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BrawlMap, MapGameMode } from '@/types/maps';
import { familyOf } from '@/lib/modes';

interface Props {
    maps: BrawlMap[];
    modes: MapGameMode[];
    totalMaps: number;
    totalModes: number;
}

/** Group maps by their mode's family name, preserving family order. */
function groupByFamily(maps: BrawlMap[]) {
    const order: string[] = [];
    const groups = new Map<string, BrawlMap[]>();
    for (const m of maps) {
        const fam = familyOf(m.gameMode.name);
        if (!groups.has(fam)) {
            order.push(fam);
            groups.set(fam, []);
        }
        groups.get(fam)!.push(m);
    }
    return order.map(name => ({ name, maps: groups.get(name)! }));
}

export default function MapsClient({ maps, modes, totalMaps, totalModes }: Props) {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const [activeFamily, setActiveFamily] = useState<string>('all');
    const [showDisabled, setShowDisabled] = useState(false);

    // Unique families in stable order derived from the modes list
    const families = useMemo(() => {
        const seen = new Set<string>();
        const result: { name: string; color: string }[] = [];
        for (const m of modes) {
            const fam = familyOf(m.name);
            if (!seen.has(fam)) {
                seen.add(fam);
                result.push({ name: fam, color: m.color });
            }
        }
        return result;
    }, [modes]);

    const filtered = useMemo(() => {
        const q = deferredQuery.trim().toLowerCase();
        return maps.filter(m => {
            if (!showDisabled && m.disabled) return false;
            if (activeFamily !== 'all' && familyOf(m.gameMode.name) !== activeFamily) return false;
            if (q && !m.name.toLowerCase().includes(q)) return false;
            return true;
        });
    }, [maps, deferredQuery, activeFamily, showDisabled]);

    const groups = useMemo(() => groupByFamily(filtered), [filtered]);
    const totalFiltered = filtered.length;

    return (
        <div className="flex flex-col gap-10">
            {/* ── Hero banner ─────────────────────────────────────────── */}
            <header
                className="relative overflow-hidden flex flex-wrap items-end justify-between gap-8 p-6 sm:p-10 md:p-14 rounded-[36px]"
                style={{
                    background:
                        'radial-gradient(600px 300px at 90% 0%,rgba(0,207,255,.35),transparent 65%),repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 32px),repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 32px),linear-gradient(120deg,#12306e 0%,#2a2f7a 50%,#5a2a9c 100%)',
                    boxShadow: '0 24px 60px rgba(18,48,110,.5)',
                }}>
                <div className="flex flex-col gap-3">
                    <span className="pill-gold w-max">The Arenas</span>
                    <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-none">
                        All Maps
                    </h1>
                    <p className="max-w-md text-base text-soft">
                        Every map in the game, with its mode, creator and rotation status.
                    </p>
                </div>

                {/* Stat chips */}
                <div className="flex flex-wrap gap-4">
                    {[
                        { n: totalMaps.toLocaleString('en-US'), label: 'Maps' },
                        { n: totalModes, label: 'Game modes' },
                    ].map(s => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center gap-[2px] min-w-[112px] bg-[rgba(15,18,38,.55)] rounded-[24px] px-[22px] py-[18px]">
                            <span className="font-display text-4xl sm:text-5xl leading-none text-gold">
                                {s.n}
                            </span>
                            <span className="text-xs text-soft">{s.label}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* ── Filters ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-surface p-5">
                {/* Search + toggle row */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-full min-w-60 rounded-full border border-line flex items-center px-4 sm:px-6 min-h-12 sm:min-h-15 gap-3 bg-background flex-1">
                        <Image
                            src="/search.svg"
                            alt="Search"
                            width={20}
                            height={20}
                            className="size-5 sm:size-[22px] shrink-0"
                        />
                        <input
                            type="text"
                            placeholder={`Search ${totalMaps.toLocaleString('en-US')} maps by name`}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="placeholder:font-medium w-full outline-none text-sm sm:text-base bg-transparent"
                        />
                    </div>

                    {/* Show disabled toggle */}
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-soft select-none">
                        <button
                            role="switch"
                            type="button"
                            aria-checked={showDisabled}
                            onClick={() => setShowDisabled(v => !v)}
                            className={`relative h-6 w-11 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                                showDisabled
                                    ? 'border-gold bg-gold'
                                    : 'border-line bg-background'
                            }`}>
                            <span
                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                    showDisabled ? 'left-[calc(100%-18px)]' : 'left-0.5'
                                }`}
                            />
                        </button>
                        Show disabled maps
                    </label>
                </div>

                {/* Family filter pills */}
                <div className="flex flex-wrap gap-2">
                    <FamilyChip
                        label="All"
                        active={activeFamily === 'all'}
                        onClick={() => setActiveFamily('all')}
                    />
                    {families.map(f => (
                        <FamilyChip
                            key={f.name}
                            label={f.name}
                            color={f.color}
                            active={activeFamily === f.name}
                            onClick={() =>
                                setActiveFamily(prev =>
                                    prev === f.name ? 'all' : f.name,
                                )
                            }
                        />
                    ))}
                </div>
            </div>

            {/* ── Grouped grid ────────────────────────────────────────── */}
            <div className="flex flex-col gap-14">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-sm text-muted">
                        Showing {totalFiltered.toLocaleString('en-US')} of{' '}
                        {totalMaps.toLocaleString('en-US')} maps
                    </span>
                </div>

                {groups.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-[24px] border border-line bg-surface text-muted">
                        <span className="text-4xl">🗺️</span>
                        <p className="text-sm font-medium">No maps match your filters</p>
                    </div>
                ) : (
                    groups.map(group => (
                        <section key={group.name} className="flex flex-col gap-6">
                            <h2 className="font-display text-3xl sm:text-4xl">
                                {group.name}
                            </h2>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {group.maps.map(m => (
                                    <MapCard key={m.id} map={m} />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </div>
    );
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function FamilyChip({
    label,
    color,
    active,
    onClick,
}: {
    label: string;
    color?: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-full border py-2 px-3.5 sm:py-3 sm:px-5.5 cursor-pointer transition-colors ${
                active
                    ? 'bg-gold text-background border-transparent font-medium'
                    : 'bg-background border-line text-foreground hover:border-slate-600'
            }`}>
            {color && (
                <span
                    className="size-2 sm:size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                />
            )}
            <span className="text-xs sm:text-[14px]">{label}</span>
        </button>
    );
}

function MapCard({ map: m }: { map: BrawlMap }) {
    return (
        <Link
            href={`/maps/${m.id}`}
            className="group flex flex-col overflow-hidden rounded-[24px] border border-line bg-surface transition duration-200 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_18px_40px_rgba(0,0,0,.5)]">
            {/* Image */}
            <div
                className="relative aspect-square w-full"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${m.gameMode.color}66, transparent 70%), linear-gradient(160deg, ${m.gameMode.color}55, #1a1e3d 130%)`,
                }}>
                <Image
                    src={m.imageUrl}
                    alt={m.name}
                    fill
                    sizes="(min-width:1280px) 300px, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Mode badge */}
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold leading-none backdrop-blur-sm">
                    <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: m.gameMode.color }}
                    />
                    {m.gameMode.name}
                </span>

                {/* NEW badge */}
                {m.new && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold tracking-widest text-background">
                        NEW
                    </span>
                )}

                {/* Disabled overlay */}
                {m.disabled && (
                    <span className="absolute inset-x-0 bottom-0 bg-background/70 py-1 text-center text-[10px] font-semibold tracking-wider text-muted backdrop-blur-sm">
                        DISABLED
                    </span>
                )}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-0.5 px-4 pb-4 pt-3">
                <span className="truncate font-display text-lg leading-tight">
                    {m.name}
                </span>
                <span className="truncate text-xs text-muted">
                    {m.credit ? `by ${m.credit}` : 'No credit listed'}
                </span>
            </div>

            {/* Mode-coloured bottom bar */}
            <div
                className="mt-auto h-1 w-full"
                style={{ backgroundColor: m.gameMode.color }}
            />
        </Link>
    );
}
