import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedMaps } from '@/lib/data';

export default async function Maps() {
    const { maps, total } = await getFeaturedMaps();

    return (
        <section className="flex flex-col gap-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-4xl md:text-5xl">Maps</h2>
                <Link
                    href="/maps"
                    className="text-[15px] font-semibold text-gold">
                    Browse all {total.toLocaleString('en-US')} →
                </Link>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
                {maps.map(m => (
                    <Link
                        key={m.id}
                        href={`/maps/${m.id}`}
                        className="group flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface transition duration-200 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_18px_40px_rgba(0,0,0,.45)]">
                        <div
                            className="relative aspect-4/3"
                            style={{
                                background: `radial-gradient(circle at 50% 50%, ${m.gameMode.color}66, transparent 70%), linear-gradient(160deg, ${m.gameMode.color}55, #1a1e3d 130%)`,
                            }}>
                            <Image
                                src={m.imageUrl}
                                alt=""
                                fill
                                sizes="(min-width:1024px) 400px, 100vw"
                                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 text-[13px] font-semibold">
                                <span
                                    className="size-2.5 rounded-full"
                                    style={{
                                        backgroundColor: m.gameMode.color,
                                    }}
                                />
                                {m.gameMode.name}
                            </span>
                            {m.new && (
                                <span className="absolute right-3.5 top-3.5 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold tracking-[1px] text-background">
                                    NEW
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 px-5.5 pb-5.5 pt-4.5">
                            <span className="truncate font-display text-[26px] leading-tight">
                                {m.name}
                            </span>
                            <span className="truncate text-[13px] text-muted">
                                {m.credit
                                    ? `by ${m.credit}`
                                    : 'No credit listed'}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
