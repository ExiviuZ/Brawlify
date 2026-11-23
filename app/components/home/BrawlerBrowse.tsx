// app/components/home/BrawlerBrowse.tsx
'use client';

import { useState } from 'react';
import BrawlerSearch from './BrawlerSearch';
import RarityFilter from './RarityFilter';
import BrawlerCard from './BrawlerCard';
import { Brawler, BrawlerRarity } from '@/types/brawler';

interface BrawlerBrowseProps {
    brawlers: Brawler[];
    rarities: BrawlerRarity[];
}

export default function BrawlerBrowse({
    brawlers,
    rarities,
}: BrawlerBrowseProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRarity, setSelectedRarity] = useState('All');
    const filterOptions = [
        { id: 0, name: 'All', color: '#94a3b8' },
        ...rarities,
    ];

    const filteredBrawlers = brawlers.filter(brawler => {
        const matchesName = brawler.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesRarity =
            selectedRarity === 'All' || brawler.rarity.name === selectedRarity;

        return matchesName && matchesRarity;
    });

    return (
        <div className="space-y-6 mb-12">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 shadow-[0_12px_32px_rgba(0,0,0,.35)] p-2.5 sm:p-3.5 rounded-3xl sm:rounded-4xl bg-surface">
                <BrawlerSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                />

                <RarityFilter
                    rarities={filterOptions}
                    selected={selectedRarity}
                    onSelect={setSelectedRarity}
                />
            </div>

            <p className="text-xs sm:text-sm text-slate-400">
                Showing {filteredBrawlers.length} of {brawlers.length} brawlers
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {filteredBrawlers.map(brawler => (
                    <BrawlerCard
                        key={brawler.id}
                        brawler={brawler}
                    />
                ))}
            </div>
        </div>
    );
}
