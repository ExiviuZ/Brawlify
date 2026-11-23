import Link from 'next/link';
import { Brawler } from '@/types/brawler';
import Image from 'next/image';
interface BrawlerProps {
    brawler: Brawler;
}

export default function BrawlerCard({ brawler }: BrawlerProps) {
    return (
        <Link
            href={`/brawler/${brawler.id}`}
            style={
                {
                    '--rarity-color': brawler.rarity.color,
                } as React.CSSProperties
            }
            className="rounded-3xl border border-line overflow-hidden transition-all hover:-translate-y-3.75 hover:border-(--rarity-color) relative">
            <div className="h-58.75 w-58.75 relative">
                <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    className="object-[center_30%]"
                    sizes="235px"
                    fill
                />
            </div>
            <div className="p-3.5 sm:p-5 bg-surface flex gap-2.5 sm:gap-3.5 h-full">
                <div className="aspect-square w-full size-10 sm:size-12 relative max-w-10 sm:max-w-12 shrink-0">
                    <Image
                        alt={brawler.name}
                        src={brawler.imageUrl3}
                        fill
                        sizes="48px"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl md:text-[24px] font-display leading-tight truncate">
                        {brawler.name}
                    </p>
                    <div className="flex gap-2 sm:gap-3 flex-wrap items-center mt-1">
                        <div className="rarity-pill">
                            <div
                                style={{
                                    backgroundColor: brawler.rarity.color,
                                }}
                                className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0"></div>
                            <span className="truncate">{brawler.rarity.name}</span>
                        </div>
                        <div>
                            <span className="text-xs sm:text-[13px] text-muted">
                                {brawler.class.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{ backgroundColor: brawler.rarity.color }}
                className="h-1.25 w-full absolute bottom-0 left-0"></div>
        </Link>
    );
}
