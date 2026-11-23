import Link from 'next/link';
import { getBrawlers } from '@/lib/data';
import BrawlerCard from '@/app/components/brawler/BrawlerCard';

export default async function NewestBrawlers() {
    const brawlers = await getBrawlers();
    const newest = brawlers.slice(0, 5); // list is newest first

    return (
        <section className="flex flex-col gap-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    Newest brawlers
                </h2>
                <Link
                    href="/brawlers"
                    className="text-xs sm:text-sm md:text-[15px] font-semibold text-gold">
                    See all {brawlers.length} →
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {newest.map(b => (
                    <BrawlerCard
                        key={b.id}
                        brawler={b}
                    />
                ))}
            </div>
        </section>
    );
}
