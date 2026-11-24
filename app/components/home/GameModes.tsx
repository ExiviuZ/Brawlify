import Image from 'next/image';
import Link from 'next/link';
import { getGameModes } from '@/lib/data';
import { groupFamilies } from '@/lib/modes';
import PillButton from '@/components/PillButton';
export default async function GameModes() {
    const gamemodes = await getGameModes();
    const families = groupFamilies(gamemodes);

    const [featured, ...rest] = families; // lowest sort1 first (Gem Grab)
    const tiles = [...rest]
        .sort((a, b) => b.variants.length - a.variants.length)
        .slice(0, 6);

    const lead = featured.lead;

    return (
        <section className="flex flex-col gap-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-4xl md:text-5xl">
                    Game modes
                </h2>
                <Link
                    href="/modes"
                    className="text-[15px] font-semibold text-gold">
                    See all {gamemodes.length} modes →
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
                {/* Featured family */}
                {/* Featured family */}
                <div
                    className="relative flex min-h-95 flex-col justify-end gap-3.5 rounded-4xl border border-line p-10"
                    style={{
                        background: `radial-gradient(500px 280px at 85% 10%, ${lead.color}8c, transparent 70%), repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 24px, transparent 24px 48px), linear-gradient(135deg, ${lead.bgColor} 0%, #2a1f5e 120%)`,
                    }}>
                    <div className="absolute -top-10 right-7 size-52 rotate-8">
                        <Image
                            src={lead.imageUrl}
                            alt=""
                            fill
                            sizes="208px"
                            className="object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,.45)]"
                        />
                    </div>
                    <span className="max-w-max rounded-full bg-background px-3.5 py-1.5 text-[13px] font-semibold tracking-[1px] uppercase">
                        {lead.title}
                    </span>
                    <span className="font-display text-6xl leading-none md:text-7xl">
                        {featured.name}
                    </span>
                    <span className="max-w-80 text-lg text-soft">
                        {lead.shortDescription}
                    </span>
                    <PillButton
                        href={`/modes?family=${featured.slug}`}
                        className="mt-1.5">
                        See {featured.name} modes →
                    </PillButton>
                </div>

                {/* Other families */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] content-start gap-4">
                    {tiles.map(f => (
                        <Link
                            key={f.slug}
                            href={`/modes?family=${f.slug}`}
                            className="flex flex-col gap-3.5 rounded-3xl border border-b-[5px] border-line bg-surface p-5 pb-4 transition duration-200 hover:-translate-y-1.5 hover:border-gold"
                            style={{ borderBottomColor: f.lead.color }}>
                            <div className="relative size-13">
                                <Image
                                    src={f.lead.imageUrl}
                                    alt=""
                                    fill
                                    sizes="52px"
                                    className="object-contain"
                                />
                            </div>
                            <span className="flex flex-col gap-0.5">
                                <span className="font-display text-[22px] leading-tight">
                                    {f.name}
                                </span>
                                <span className="text-[13px] text-muted">
                                    {f.variants.length}{' '}
                                    {f.variants.length === 1
                                        ? 'variant'
                                        : 'variants'}
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
