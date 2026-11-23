// app/components/brawler/BrawlerBrowse.tsx
'use client';

import { useState } from 'react';
import BrawlerSearch from './BrawlerSearch';
import RarityFilter from './RarityFilter';
import ClassFilter from './ClassFilter';
import BrawlerCard from './BrawlerCard';
import { Brawler, BrawlerClass, BrawlerRarity } from '@/types/brawler';

interface BrawlerBrowseProps {
    brawlers: Brawler[];
    rarities: BrawlerRarity[];
    classes?: BrawlerClass[];
    initialClass?: string;
    initialRarity?: string;
}

export default function BrawlerBrowse({
    brawlers,
    rarities,
    classes = [],
    initialClass = 'All',
    initialRarity = 'All',
}: BrawlerBrowseProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRarity, setSelectedRarity] = useState(initialRarity);
    const [selectedClass, setSelectedClass] = useState(initialClass);

    const filterOptions = [
        { id: 0, name: 'All', color: '#94a3b8' },
        ...rarities,
    ];

    const classOptions: (BrawlerClass | { id: number; name: string })[] = [
        { id: 0, name: 'All' },
        ...(classes.length > 0
            ? classes
            : [
                  ...new Map(
                      brawlers
                          .filter(b => b.class)
                          .map(b => [b.class.id, b.class]),
                  ).values(),
              ].sort((a, b) => a.id - b.id)),
    ];

    const filteredBrawlers = brawlers.filter(brawler => {
        const matchesName = brawler.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesRarity =
            selectedRarity === 'All' || brawler.rarity?.name === selectedRarity;
        const matchesClass =
            selectedClass === 'All' || brawler.class?.name === selectedClass;

        return matchesName && matchesRarity && matchesClass;
    });

    const isFiltered =
        Boolean(searchQuery) ||
        selectedRarity !== 'All' ||
        selectedClass !== 'All';

    return (
        <div className="space-y-6 mb-12">
            <div className="space-y-4 shadow-[0_12px_32px_rgba(0,0,0,.35)] p-3.5 sm:p-5 md:p-6 rounded-3xl sm:rounded-4xl bg-surface">
                <div className="flex flex-wrap items-center gap-4">
                    <BrawlerSearch
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>

                <div className="space-y-3 pt-3 border-t border-line/40">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted sm:w-16 shrink-0">
                            Rarity
                        </span>
                        <RarityFilter
                            rarities={filterOptions}
                            selected={selectedRarity}
                            onSelect={setSelectedRarity}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted sm:w-16 shrink-0">
                            Class
                        </span>
                        <ClassFilter
                            classes={classOptions}
                            selected={selectedClass}
                            onSelect={setSelectedClass}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400">
                <p>
                    Showing {filteredBrawlers.length} of {brawlers.length} brawlers
                </p>
                {isFiltered && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedRarity('All');
                            setSelectedClass('All');
                        }}
                        className="text-xs text-gold hover:underline cursor-pointer">
                        Reset filters
                    </button>
                )}
            </div>

            {filteredBrawlers.length === 0 ? (
                <div className="text-center py-16 px-4 bg-surface/50 rounded-3xl border border-line">
                    <p className="text-lg font-medium text-foreground">
                        No brawlers found
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                        Try adjusting your search query, rarity, or class filter.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {filteredBrawlers.map(brawler => (
                        <BrawlerCard
                            key={brawler.id}
                            brawler={brawler}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
