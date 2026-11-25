/**
 * Shape-matched loading skeletons for each homepage section.
 * Uses a gold shimmer sweep instead of a plain grey pulse to match
 * the Brawl Stars theme.
 */

/** Base shimmer shard — mirrors the surface/line palette */
function Shard({ className = '' }: { className?: string }) {
    return (
        <div
            className={`rounded-2xl bg-[length:200%_100%] animate-shimmer ${className}`}
            style={{
                backgroundImage:
                    'linear-gradient(90deg, #1a1e3d 0%, #252b5c 40%, #2f3772 50%, #252b5c 60%, #1a1e3d 100%)',
            }}
        />
    );
}

/** ── Stats strip: 4 tall number cards ───────────────────────────────── */
export function StatsStripSkeleton() {
    return (
        <section
            aria-hidden="true"
            className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col items-center gap-3 rounded-[28px] border border-line bg-surface px-5 py-7">
                    {/* Big number */}
                    <Shard className="h-12 w-24 rounded-xl" />
                    {/* Label */}
                    <Shard className="h-4 w-16 rounded-full" />
                    {/* API path */}
                    <Shard className="h-3 w-20 rounded-full opacity-50" />
                </div>
            ))}
        </section>
    );
}

/** ── Browse by class / rarity: two columns of pill chips ────────────── */
export function BrowseRosterSkeleton() {
    const classWidths = ['w-28', 'w-20', 'w-32', 'w-24', 'w-20', 'w-28'];
    const rarityWidths = ['w-24', 'w-20', 'w-28', 'w-20', 'w-32', 'w-20', 'w-24'];

    return (
        <section
            aria-hidden="true"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-10">
            {[classWidths, rarityWidths].map((widths, col) => (
                <div
                    key={col}
                    className="flex flex-col gap-5">
                    {/* Heading */}
                    <Shard className="h-9 w-52 rounded-xl" />
                    <div className="flex flex-wrap gap-3">
                        {widths.map((w, i) => (
                            <div
                                key={i}
                                className={`inline-flex min-h-14 items-center rounded-full border border-line bg-surface px-6 ${w}`}>
                                <Shard className="h-4 w-full rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

/** ── Newest brawlers: 5 portrait cards ──────────────────────────────── */
export function NewestBrawlersSkeleton() {
    return (
        <section
            aria-hidden="true"
            className="flex flex-col gap-7">
            {/* Heading row */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <Shard className="h-9 w-56 rounded-xl" />
                <Shard className="h-4 w-24 rounded-full" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col rounded-3xl border border-line overflow-hidden">
                        {/* Portrait area */}
                        <Shard className="aspect-square w-full rounded-none" />
                        {/* Info row */}
                        <div className="flex gap-3 p-4 bg-surface">
                            <Shard className="size-10 shrink-0 rounded-full" />
                            <div className="flex flex-1 flex-col gap-2 justify-center">
                                <Shard className="h-4 w-full rounded-full" />
                                <Shard className="h-3 w-3/4 rounded-full opacity-60" />
                            </div>
                        </div>
                        {/* Rarity bar */}
                        <div className="h-1.25 w-full bg-line" />
                    </div>
                ))}
            </div>
        </section>
    );
}

/** ── Game modes: 1 featured card + 6 small tiles ────────────────────── */
export function GameModesSkeleton() {
    return (
        <section
            aria-hidden="true"
            className="flex flex-col gap-7">
            {/* Heading row */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <Shard className="h-9 w-44 rounded-xl" />
                <Shard className="h-4 w-32 rounded-full" />
            </div>

            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
                {/* Featured card */}
                <div className="relative min-h-95 rounded-4xl border border-line bg-surface overflow-hidden">
                    <Shard className="absolute inset-0 rounded-none" />
                    {/* Text stack at bottom */}
                    <div className="absolute bottom-10 left-10 flex flex-col gap-3">
                        <Shard className="h-6 w-20 rounded-full" />
                        <Shard className="h-14 w-56 rounded-xl" />
                        <Shard className="h-4 w-64 rounded-full opacity-70" />
                        <Shard className="h-11 w-40 rounded-full" />
                    </div>
                </div>

                {/* 6 small tiles */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] content-start gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-3.5 rounded-3xl border border-line bg-surface p-5">
                            <Shard className="size-13 rounded-xl" />
                            <div className="flex flex-col gap-2">
                                <Shard className="h-6 w-28 rounded-lg" />
                                <Shard className="h-3 w-16 rounded-full opacity-60" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** ── Maps: heading + grid of map cards ──────────────────────────────── */
export function MapsSkeleton() {
    return (
        <section
            aria-hidden="true"
            className="flex flex-col gap-7">
            {/* Heading row */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <Shard className="h-9 w-24 rounded-xl" />
                <Shard className="h-4 w-36 rounded-full" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col rounded-[28px] border border-line bg-surface overflow-hidden">
                        {/* Map image */}
                        <Shard className="aspect-4/3 w-full rounded-none" />
                        {/* Card footer */}
                        <div className="flex flex-col gap-2 px-5.5 pb-5.5 pt-4.5">
                            <Shard className="h-6 w-3/4 rounded-lg" />
                            <Shard className="h-3 w-1/2 rounded-full opacity-60" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
