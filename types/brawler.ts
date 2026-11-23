export interface BrawlersResponse {
    list: Brawler[];
}

export interface Brawler {
    id: number;
    avatarId: number;
    name: string;
    hash: string;
    path: string;
    fankit: string;
    released: boolean;
    version: number;
    link: string;
    imageUrl: string;
    imageUrl2: string;
    imageUrl3: string;
    class: BrawlerClass;
    rarity: BrawlerRarity;
    unlock: number | null;
    description: string;
    descriptionHtml: string;
    starPowers: BrawlerAbility[];
    gadgets: BrawlerAbility[];
    videos: unknown[]; // Replace with specific interface if video objects are present
}

export interface BrawlerClass {
    id: number;
    name: string;
}

export interface BrawlerRarity {
    id: number;
    name: string;
    color: string;
}

export interface BrawlerAbility {
    id: number;
    name: string;
    path: string;
    version: number;
    description: string;
    descriptionHtml: string;
    imageUrl: string;
    released: boolean;
}
