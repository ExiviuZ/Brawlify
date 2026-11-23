import { Suspense } from 'react';
import { cacheLife } from 'next/cache';
import apiFetch from '@/lib/api';
import { Brawler } from '@/types/brawler';
import Loader from '@/components/Loader';
import BrawlerHeader from '@/app/components/brawler/BrawlerHeader';
import BrawlerFacts from '@/app/components/brawler/BrawlerFacts';
import BrawlerAbilities from '@/app/components/brawler/BrawlerAbilities';

async function getBrawler(id: string) {
    'use cache';
    cacheLife('hours');
    return apiFetch<Brawler>(`/brawlers/${id}`);
}

export default function TheBrawler({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense fallback={<Loader />}>
            <BrawlerContent params={params} />
        </Suspense>
    );
}

async function BrawlerContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const brawler = await getBrawler(id);

    return (
        <div className="wrapper flex flex-col gap-10 pb-24">
            <div className="flex flex-col gap-4">
                <BrawlerHeader brawler={brawler} />
                <BrawlerFacts brawler={brawler} />
            </div>

            <BrawlerAbilities brawler={brawler} />
        </div>
    );
}
