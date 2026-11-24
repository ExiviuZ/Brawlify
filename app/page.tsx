import { Suspense } from 'react';
import HeroSection from '@/app/components/home/HeroSection';
import StatsStrip from '@/app/components/home/StatsStrip';
import BrowseRoster from '@/app/components/home/BrowseRoster';
import NewestBrawlers from '@/app/components/home/NewestBrawlers';
import GameModes from '@/app/components/home/GameModes';
import Maps from '@/app/components/home/Maps';

const Skeleton = ({ h }: { h: string }) => (
    <div className={`${h} animate-pulse rounded-[28px] bg-surface/50`} />
);

export default function Home() {
    return (
        <div className="wrapper flex flex-col gap-24 pb-24">
            <HeroSection />
            <Suspense fallback={<Skeleton h="h-40" />}>
                <StatsStrip />
            </Suspense>
            <Suspense fallback={<Skeleton h="h-56" />}>
                <BrowseRoster />
            </Suspense>
            <Suspense fallback={<Skeleton h="h-96" />}>
                <NewestBrawlers />
            </Suspense>
            <Suspense fallback={<Skeleton h="h-96" />}>
                <GameModes />
            </Suspense>
            <Suspense fallback={<Skeleton h="h-96" />}>
                <Maps />
            </Suspense>
        </div>
    );
}
