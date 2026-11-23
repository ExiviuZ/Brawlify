import { BrawlerRarity } from '@/types/brawler';

interface RarityFilterProps {
    rarities: BrawlerRarity[];
    selected: string;
    onSelect: (rarity: string) => void;
}

export default function RarityFilter({
    rarities,
    selected,
    onSelect,
}: RarityFilterProps) {
    return (
        <div className="flex gap-2 flex-wrap">
            {rarities.map(rarity => {
                const isActive = selected === rarity.name;
                return (
                    <button
                        key={rarity.id}
                        type="button"
                        onClick={() => onSelect(rarity.name)}
                        className={`${
                            isActive
                                ? 'bg-gold text-background border-transparent font-medium'
                                : 'bg-background border-line text-foreground hover:border-slate-600'
                        } border py-2 px-3.5 sm:py-3 sm:px-5.5 rounded-full cursor-pointer transition-colors flex items-center gap-2`}>
                        <div
                            style={{ backgroundColor: rarity.color }}
                            className="size-2 sm:size-2.5 rounded-full shrink-0"></div>
                        <span className="text-xs sm:text-[14px]">{rarity.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
