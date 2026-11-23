import Image from 'next/image';
import { Brawler } from '@/types/brawler';
import FavoriteButton from '@/components/FavoriteButtonInner';
import PillButton from '@/components/PillButton';
interface BrawlerHeaderProps {
    brawler: Brawler;
}

export default function BrawlerHeader({ brawler }: BrawlerHeaderProps) {
    const paragraphs = brawler.descriptionHtml
        .split(/<br\s*\/?>\s*<br\s*\/?>/i)
        .map(p => p.replace(/<[^>]*>/g, '').trim())
        .filter(Boolean);

    return (
        <div
            className="wrapper"
            style={{ '--accent': brawler.rarity.color } as React.CSSProperties}>
            <div
                className="relative mt-6 flex flex-wrap items-center gap-8 md:gap-12 rounded-3xl md:rounded-[40px] border border-line p-6 sm:p-8 md:p-12 shadow-[0_28px_64px_rgba(0,0,0,.45)]"
                style={{
                    background:
                        'radial-gradient(600px 320px at 85% 0%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 65%), repeating-linear-gradient(135deg, rgba(255,255,255,.035) 0 24px, transparent 24px 48px), linear-gradient(130deg, #1a1e3d 0%, #3a2a6e 100%)',
                }}>
                <div className="relative aspect-square w-full max-w-[280px] sm:max-w-80 md:max-w-90 md:size-90 mx-auto md:mx-0 shrink-0 overflow-hidden rounded-3xl md:rounded-[40px]">
                    <Image
                        src={brawler.imageUrl2}
                        alt={brawler.name}
                        fill
                        sizes="(max-width: 768px) 280px, 360px"
                        className="object-cover"
                        priority
                    />
                </div>

                <section className="flex-1 min-w-0">
                    <ul className="flex items-center gap-2.5 flex-wrap">
                        <li className="rarity-pill">
                            <div
                                style={{
                                    backgroundColor: brawler.rarity.color,
                                }}
                                className="h-2.5 w-2.5 rounded-full"
                            />
                            {brawler.rarity.name}
                        </li>
                        <li className="grid place-items-center rounded-full bg-gold px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-background">
                            {brawler.class.name}
                        </li>
                        <li className="relative size-10 sm:size-12">
                            <Image
                                src={brawler.imageUrl3}
                                className="object-contain"
                                alt=""
                                fill
                                sizes="48px"
                            />
                        </li>
                    </ul>

                    <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[100px] xl:text-[120px] leading-none break-words mt-3 sm:mt-4">
                        {brawler.name}
                    </h1>

                    <div className="mt-4 flex max-w-2xl flex-col gap-3.5">
                        {paragraphs.map((text, i) => (
                            <p
                                key={i}
                                className="text-sm sm:text-base md:text-[19px] leading-relaxed text-soft">
                                {text}
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <PillButton
                            href={brawler.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 sm:mt-6">
                            View on Brawlify <span aria-hidden="true">↗</span>
                        </PillButton>

                        <FavoriteButton id={brawler.id} />
                    </div>
                </section>
            </div>
        </div>
    );
}
