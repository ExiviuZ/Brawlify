import type { Metadata } from 'next';
import { getAllMaps, getGameModes } from '@/lib/data';
import MapsClient from './MapsClient';

export const metadata: Metadata = {
    title: 'Maps',
    description: 'Every Brawl Stars arena — browse all 1,300+ maps by game mode, search by name, and filter disabled maps.',
};

export default async function MapsPage() {
    const [maps, gameModes] = await Promise.all([
        getAllMaps(),
        getGameModes(),
    ]);

    // Unique modes that actually appear on at least one map, in name order
    const modeMap = new Map(
        maps.map(m => [m.gameMode.id, m.gameMode])
    );
    const modes = [...modeMap.values()].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    return (
        <main className="wrapper py-10 sm:py-16">
            <MapsClient
                maps={maps}
                modes={modes}
                totalMaps={maps.length}
                totalModes={gameModes.length}
            />
        </main>
    );
}
