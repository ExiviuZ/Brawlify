interface BrawlerHeroProps {
    totalBrawlers: number;
    totalClasses: number;
    totalRarities: number;
}

export default function BrawlerHero({
    totalBrawlers,
    totalClasses,
    totalRarities,
}: BrawlerHeroProps) {
    const stats = [
        { label: 'Brawlers', value: totalBrawlers },
        { label: 'Classes', value: totalClasses },
        { label: 'Rarities', value: totalRarities },
    ];

    return (
        <header className="relative overflow-hidden flex flex-wrap items-center justify-between gap-8 p-6 sm:p-10 md:p-14 rounded-3xl md:rounded-[36px] bg-[radial-gradient(600px_300px_at_90%_0%,rgba(255,210,63,0.35),transparent_65%),repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_24px,transparent_24px_48px),linear-gradient(120deg,#2a2f7a_0%,#5a2a9c_55%,#9a3df3_100%)] shadow-[0_24px_60px_rgba(90,42,156,0.45)] mb-8 md:mb-12">
            {/* Left Content */}
            <div className="space-y-3">
                <span className="inline-block bg-gold text-background text-[11px] sm:text-[12px] font-bold tracking-wider uppercase px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full">
                    THE ROSTER
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[78px] font-display leading-none break-words">
                    All Brawlers
                </h1>
                <p className="text-sm sm:text-base md:text-[18px] text-white/90 max-w-xl">
                    Star powers, gadgets and lore for every fighter in the game,
                    newest first.
                </p>
            </div>

            {/* Right Stat Boxes */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
                {stats.map(stat => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center bg-[#1b1438]/60 border border-white/10 rounded-2xl sm:rounded-[24px] px-5 py-4 sm:px-8 sm:py-6 min-w-[95px] sm:min-w-[130px] flex-1 sm:flex-initial">
                        <span className="text-2xl sm:text-3xl md:text-[48px] text-gold font-display leading-none">
                            {stat.value}
                        </span>
                        <span className="text-[11px] sm:text-[14px] text-white/80 mt-1 sm:mt-2">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </header>
    );
}
