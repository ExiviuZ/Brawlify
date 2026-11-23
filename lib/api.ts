const defaultUrl =
    process.env.NEXT_PUBLIC_API_URL ?? 'https://api.brawlapi.com/v1';

const defaultApiKey = process.env.API_SECRET_KEY;

export default async function apiFetch<T>(
    relativePath: string,
    options?: RequestInit & { token?: string },
    baseUrl: string = defaultUrl,
): Promise<T> {
    const cleanBase = baseUrl.replace(/\/+$/, '');
    const cleanPath = relativePath.startsWith('/')
        ? relativePath
        : `/${relativePath}`;

    const authToken = options?.token ?? defaultApiKey;

    const res = await fetch(`${cleanBase}${cleanPath}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const errorBody = await res.text().catch(() => '');
        throw new Error(
            `API Error (${res.status} ${res.statusText}): ${errorBody}`,
        );
    }

    if (res.status === 204) {
        return undefined as T;
    }

    return res.json() as Promise<T>;
}
