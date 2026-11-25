import { Suspense } from 'react';
import HeroSection from '@/app/components/home/HeroSection';
import StatsStrip from '@/app/components/home/StatsStrip';
import BrowseRoster from '@/app/components/home/BrowseRoster';
import NewestBrawlers from '@/app/components/home/NewestBrawlers';
import GameModes from '@/app/components/home/GameModes';
import Maps from '@/app/components/home/Maps';
import {
    StatsStripSkeleton,
    BrowseRosterSkeleton,
    NewestBrawlersSkeleton,
    GameModesSkeleton,
    MapsSkeleton,
} from '@/app/components/home/HomeSkeleton';

export default function Home() {
    return (
        <div className="wrapper flex flex-col gap-24 pb-24">
            <HeroSection />
            <Suspense fallback={<StatsStripSkeleton />}>
                <StatsStrip />
            </Suspense>
            <Suspense fallback={<BrowseRosterSkeleton />}>
                <BrowseRoster />
            </Suspense>
            <Suspense fallback={<NewestBrawlersSkeleton />}>
                <NewestBrawlers />
            </Suspense>
            <Suspense fallback={<GameModesSkeleton />}>
                <GameModes />
            </Suspense>
            <Suspense fallback={<MapsSkeleton />}>
                <Maps />
            </Suspense>
        </div>
    );
}
