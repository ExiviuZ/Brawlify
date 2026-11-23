import { Suspense } from 'react';
import PillButton from '@/components/PillButton';
import HeroStack from '@/app/components/home/HeroStack';

export default function HeroSection() {
    return (
        <section
            aria-labelledby="hero-heading"
            className="flex flex-wrap items-center gap-16">
            <div className="flex flex-1 basis-130 flex-col gap-7">
                <p className="max-w-max rounded-full bg-gold px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-[13px] font-semibold tracking-[1.5px] sm:tracking-[2px] text-background">
                    A FREE BRAWL STARS COMPANION
                </p>

                <h1
                    id="hero-heading"
                    className="max-w-164.5 text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[112px] leading-[0.95] sm:leading-[0.92]">
                    Every brawler.
                    <br />
                    Every map.
                    <br />
                    <span className="text-gold">One place.</span>
                </h1>

                <p className="max-w-140 text-base sm:text-lg md:text-[20px]">
                    Browse star powers, gadgets and lore for the whole roster,
                    and explore 1,300 maps across every game mode.
                </p>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    <PillButton href="/brawlers">Browse brawlers</PillButton>
                    <PillButton
                        variant="dark"
                        href="/maps">
                        Explore maps
                    </PillButton>
                </div>
            </div>

            <Suspense
                fallback={
                    <div className="min-h-115 min-w-75 flex-1 basis-105" />
                }>
                <HeroStack />
            </Suspense>
        </section>
    );
}
