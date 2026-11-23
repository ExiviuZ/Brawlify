import Link from 'next/link';
import { getBrawlers } from '@/lib/data';

export default async function BrowseRoster() {
    const brawlers = await getBrawlers();

    // Unique by id, ordered by id, straight from the data
    const classes = [
        ...new Map(brawlers.map(b => [b.class.id, b.class])).values(),
    ].sort((a, b) => a.id - b.id);
    const rarities = [
        ...new Map(brawlers.map(b => [b.rarity.id, b.rarity])).values(),
    ].sort((a, b) => a.id - b.id);

    const chip =
        'inline-flex min-h-14 items-center gap-2.5 rounded-full border border-line bg-surface px-6 transition hover:-translate-y-0.5 hover:border-gold';

    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-10">
            <div className="flex flex-col gap-5">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Browse by class</h2>
                <div className="flex flex-wrap gap-3">
                    {classes.map(c => (
                        <Link
                            key={c.id}
                            href={`/brawlers?class=${encodeURIComponent(c.name)}`}
                            className={`${chip} font-display text-base sm:text-lg md:text-[22px]`}>
                            {c.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Browse by rarity</h2>
                <div className="flex flex-wrap gap-3">
                    {rarities.map(r => (
                        <Link
                            key={r.id}
                            href={`/brawlers?rarity=${encodeURIComponent(r.name)}`}
                            className={`${chip} text-xs sm:text-sm md:text-base font-semibold`}>
                            <span
                                className="size-3 rounded-full"
                                style={{ backgroundColor: r.color }}
                            />
                            {r.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
