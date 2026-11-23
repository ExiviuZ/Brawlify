import { CSSProperties } from 'react';
import { Brawler } from '@/types/brawler';
import AbilityIcon from './AbilityIcon';

export type Ability = Brawler['starPowers'][number];

interface AbilityCardProps {
    ability: Ability;
    kind: 'star' | 'gadget';
    tag: string;
    accent: string;
    gradient: string;
    className?: string;
    style?: CSSProperties;
}

export function Description({ text }: { text: string }) {
    return (
        <>
            {text.split(/(\bx%?(?!\w))/g).map((part, i) =>
                /^x%?$/.test(part) ? (
                    <span
                        key={i}
                        className="font-semibold text-[#00cc00]">
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
}

export default function AbilityCard({
    ability,
    kind,
    tag,
    accent,
    gradient,
    className = '',
    style,
}: AbilityCardProps) {
    return (
        <article
            className={`flex min-h-32 sm:min-h-40 items-start gap-4 sm:gap-5 rounded-2xl sm:rounded-[28px] border border-line p-4 sm:p-6 transition duration-200 hover:-translate-y-1 hover:border-gold ${className}`}
            style={{ background: gradient, ...style }}>
            <AbilityIcon
                src={ability.imageUrl}
                alt={ability.name}
                kind={kind}
            />
            <div className="flex min-w-0 flex-col gap-1.5">
                <span
                    className="text-[11px] sm:text-xs font-semibold tracking-[1px] sm:tracking-[1.5px]"
                    style={{ color: accent }}>
                    {tag}
                </span>
                <h3 className="font-display text-lg sm:text-2xl md:text-[28px] leading-tight break-words">
                    {ability.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-soft">
                    <Description text={ability.description} />
                </p>
            </div>
        </article>
    );
}
