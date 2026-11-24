export interface MapEnvironment {
    id: number;
    scId: number;
    name: string;
    hash: string;
    path: string;
    version: number;
    imageUrl: string;
}

export interface MapGameMode {
    id: number;
    scId: number;
    name: string;
    hash: string;
    version: number;
    color: string;
    bgColor: string;
    link: string;
    imageUrl: string;
}

export interface BrawlMap {
    id: number;
    new: boolean;
    disabled: boolean;
    name: string;
    hash: string;
    version: number;
    link: string;
    imageUrl: string;
    credit: string | null;
    environment: MapEnvironment;
    gameMode: MapGameMode;
    lastActive: number;
    dataUpdated: number;
}

export interface BrawlMapDetail extends BrawlMap {
    stats: unknown[];
    teamStats: unknown[];
}

export interface MapsResponse {
    list: BrawlMap[];
}

export type MapResponse = BrawlMapDetail;
