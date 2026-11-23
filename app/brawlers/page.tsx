import apiFetch from '@/lib/api';
import { BrawlersResponse } from '@/types/brawler';
import BrawlerHero from '../components/brawler/BrawlerHero';
import BrawlerBrowse from '../components/brawler/BrawlerBrowse';

export default async function BrawlersPage() {
    const data = await apiFetch<BrawlersResponse>('/brawlers');

    const rarities = [
        ...new Map(
            data.list.filter(b => b.rarity).map(b => [b.rarity.id, b.rarity]),
        ).values(),
    ].sort((a, b) => a.id - b.id);

    const classes = [
        ...new Map(
            data.list.filter(b => b.class).map(b => [b.class.id, b.class]),
        ).values(),
    ].sort((a, b) => a.id - b.id);

    return (
        <main className="wrapper">
            <BrawlerHero
                totalBrawlers={data.list.length}
                totalClasses={classes.length}
                totalRarities={rarities.length}
            />
            <BrawlerBrowse
                brawlers={data.list}
                rarities={rarities}
                classes={classes}
            />
        </main>
    );
}
