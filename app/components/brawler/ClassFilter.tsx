import { BrawlerClass } from '@/types/brawler';

interface ClassFilterProps {
    classes: (BrawlerClass | { id: number; name: string })[];
    selected: string;
    onSelect: (className: string) => void;
}

export default function ClassFilter({
    classes,
    selected,
    onSelect,
}: ClassFilterProps) {
    return (
        <div className="flex gap-2 flex-wrap">
            {classes.map(cls => {
                const isActive = selected === cls.name;
                return (
                    <button
                        key={cls.id}
                        type="button"
                        onClick={() => onSelect(cls.name)}
                        className={`${
                            isActive
                                ? 'bg-gold text-background border-transparent font-medium'
                                : 'bg-background border-line text-foreground hover:border-slate-600'
                        } border py-2 px-3.5 sm:py-3 sm:px-5.5 rounded-full cursor-pointer transition-colors flex items-center`}>
                        <span className="text-xs sm:text-[14px]">{cls.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
