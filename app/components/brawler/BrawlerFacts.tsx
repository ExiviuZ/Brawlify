import { Brawler } from '@/types/brawler';

interface BrawlerFactsProps {
    brawler: Brawler;
}

export default function BrawlerFacts({ brawler }: BrawlerFactsProps) {
    const facts = [
        {
            label: 'Rarity',
            value: brawler.rarity.name,
            dot: brawler.rarity.color,
        },
        { label: 'Class', value: brawler.class.name },
        { label: 'Brawler ID', value: String(brawler.id) },
        {
            label: 'Status',
            value: brawler.released ? 'Released' : 'Unreleased',
            dot: brawler.released ? '#2edd1d' : '#ffd23f',
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {facts.map(f => (
                <div
                    key={f.label}
                    className="rounded-2xl sm:rounded-3xl border border-line bg-surface px-4 py-4 sm:px-5 sm:py-6">
                    <p className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[1px] sm:tracking-[1.5px] text-muted">
                        {f.label}
                    </p>
                    <div className="flex items-center gap-2.5 sm:gap-3 mt-1">
                        {f.dot && (
                            <span
                                className="size-4 sm:size-5 shrink-0 rounded-full"
                                style={{ backgroundColor: f.dot }}
                            />
                        )}
                        <p className="font-display text-base sm:text-xl md:text-[28px] truncate">
                            {f.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
