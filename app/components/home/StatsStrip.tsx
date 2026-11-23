import { getBrawlers, getCounts } from '@/lib/data';

export default async function StatsStrip() {
    const [brawlers, counts] = await Promise.all([getBrawlers(), getCounts()]);

    const stats = [
        { n: brawlers.length, label: 'Brawlers', src: '/v1/brawlers' },
        { n: counts.maps, label: 'Maps', src: '/v1/maps' },
        { n: counts.modes, label: 'Game modes', src: '/v1/gamemodes' },
        { n: counts.icons, label: 'Profile icons', src: '/v1/icons' },
    ];

    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {stats.map(s => (
                <div
                    key={s.src}
                    className="flex flex-col items-center gap-1 rounded-[28px] border border-line bg-surface px-5 py-7">
                    <span className="font-display text-4xl sm:text-5xl md:text-6xl leading-none text-gold">
                        {s.n.toLocaleString('en-US')}
                    </span>
                    <span className="text-xs sm:text-[15px] text-muted">{s.label}</span>
                    <span className="font-mono text-[11px] sm:text-xs text-muted/70">
                        {s.src}
                    </span>
                </div>
            ))}
        </section>
    );
}
