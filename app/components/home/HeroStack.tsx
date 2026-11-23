import Image from 'next/image';
import { cacheLife } from 'next/cache';
import apiFetch from '@/lib/api';
import { Brawler } from '@/types/brawler';

async function getNewest() {
    'use cache';
    cacheLife('hours');
    const { list } = await apiFetch<{ list: Brawler[] }>('/brawlers');
    return list.slice(0, 3); // the list is newest-first
}

export default async function HeroStack() {
    const [front, left, right] = await getNewest();

    const tiles = [
        { b: left, pos: 'left-[4%] top-[12%] w-[46%] -rotate-[8deg]' },
        { b: right, pos: 'right-[2%] top-[6%] w-[46%] rotate-[7deg]' },
        {
            b: front,
            pos: 'left-[26%] bottom-0 w-[52%] -rotate-2 z-10',
            glow: true,
        },
    ];

    return (
        <div
            aria-hidden="true"
            className="relative aspect-square w-full max-w-120 flex-1 basis-80">
            {tiles.map(({ b, pos, glow }) => (
                <div
                    key={b.id}
                    className={`absolute aspect-square overflow-hidden rounded-4xl ${pos}`}
                    style={{
                        background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,.5), transparent 55%), linear-gradient(160deg, ${b.rarity.color}, #1a1e3d 150%)`,
                        boxShadow: glow
                            ? `0 0 80px ${b.rarity.color}80, 0 28px 56px rgba(0,0,0,.55)`
                            : '0 24px 48px rgba(0,0,0,.5)',
                    }}>
                    <Image
                        src={b.imageUrl2}
                        alt=""
                        fill
                        sizes="240px"
                        className="object-contain"
                    />
                </div>
            ))}
        </div>
    );
}
