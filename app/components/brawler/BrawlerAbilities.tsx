import { CSSProperties } from 'react';
import { Brawler } from '@/types/brawler';
import AbilityCard from './AbilityCard';

interface BrawlerAbilitiesProps {
    brawler: Brawler;
}

export function SectionHeading({
    title,
    count,
    className = '',
}: {
    title: string;
    count: number;
    className?: string;
}) {
    return (
        <div className={`flex items-baseline justify-between ${className}`}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl">{title}</h2>
            <span className="text-xs sm:text-sm text-muted">{count} abilities</span>
        </div>
    );
}

export default function BrawlerAbilities({ brawler }: BrawlerAbilitiesProps) {
    const rows = Math.max(
        brawler.starPowers.length,
        brawler.gadgets.length,
    );

    return (
        <section
            className="grid gap-5 md:grid-cols-2 md:gap-x-10 md:[grid-template-rows:auto_repeat(var(--rows),1fr)]"
            style={{ '--rows': rows } as CSSProperties}>
            <SectionHeading
                className="md:col-start-1 md:row-start-1"
                title="Star Powers"
                count={brawler.starPowers.length}
            />
            {brawler.starPowers.map((star, i) => (
                <AbilityCard
                    key={star.id}
                    ability={star}
                    kind="star"
                    tag={`STAR POWER ${i + 1}`}
                    accent="#ffd23f"
                    gradient="linear-gradient(135deg,#1a1e3d,#232859)"
                    className="md:col-start-1 md:[grid-row:var(--r)]"
                    style={{ '--r': i + 2 } as CSSProperties}
                />
            ))}

            <SectionHeading
                className="md:col-start-2 md:row-start-1"
                title="Gadgets"
                count={brawler.gadgets.length}
            />
            {brawler.gadgets.map((gadget, i) => (
                <AbilityCard
                    key={gadget.id}
                    ability={gadget}
                    kind="gadget"
                    tag={`GADGET ${i + 1}`}
                    accent="#2edd1d"
                    gradient="linear-gradient(135deg,#1a1e3d,#1f3a3a)"
                    className="md:col-start-2 md:[grid-row:var(--r)]"
                    style={{ '--r': i + 2 } as CSSProperties}
                />
            ))}
        </section>
    );
}
