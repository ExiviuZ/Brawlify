import Link from 'next/link';
import { Brawler } from '@/types/brawler';
import FavoriteButton from '@/components/FavoriteButton';
import Image from 'next/image';

interface BrawlerProps {
    brawler: Brawler;
}

export default function BrawlerCard({ brawler }: BrawlerProps) {
    return (
        <article
            className="group relative flex flex-col rounded-3xl border border-line overflow-hidden transition duration-200 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_18px_40px_rgba(0,0,0,.45)] focus-within:border-gold">
            <div className="relative aspect-square w-full">
                <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    className="object-[center_30%] transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 235px"
                    fill
                />
                {/* Sibling to Link, elevated with z-10 so it intercepts clicks cleanly */}
                <div className="absolute top-4 left-4 z-10">
                    <FavoriteButton id={brawler.id} />
                </div>
            </div>

            <div className="p-3.5 sm:p-5 bg-surface flex gap-2.5 sm:gap-3.5 flex-1">
                <div className="aspect-square w-full size-10 sm:size-12 relative max-w-10 sm:max-w-12 shrink-0">
                    <Image
                        alt={brawler.name}
                        src={brawler.imageUrl3}
                        fill
                        className="object-contain"
                        sizes="48px"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base md:text-xl lg:text-[24px] font-display leading-tight truncate">
                        {/* Stretched link covers the entire <article> via after:inset-0 */}
                        <Link
                            href={`/brawlers/${brawler.id}`}
                            className="after:absolute after:inset-0 focus:outline-none">
                            {brawler.name}
                        </Link>
                    </h3>
                    <div className="flex gap-2 sm:gap-3 flex-wrap items-center mt-1">
                        <div className="rarity-pill">
                            <div
                                style={{
                                    backgroundColor: brawler.rarity.color,
                                }}
                                className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0"
                            />
                            <span className="truncate">
                                {brawler.rarity.name}
                            </span>
                        </div>
                        <div>
                            <span className="text-[11px] sm:text-[13px] text-muted">
                                {brawler.class.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{ backgroundColor: brawler.rarity.color }}
                className="h-1.25 w-full absolute bottom-0 left-0"
            />
        </article>
    );
}
