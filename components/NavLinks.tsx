'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useFavoriteStore } from '@/app/stores/favorite-store';

const navItems = [
    { label: 'Brawlers', href: '/brawlers' },
    { label: 'Maps', href: '/projects' },
    { label: 'Modes', href: '/about' },
    { label: 'Icons', href: '/icons' },
];

export default function NavLinks() {
    const pathname = usePathname();
    const favoriteBrawlers = useFavoriteStore(state => state.favoriteBrawlers);

    return (
        <ul className="font-medium flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
            {navItems.map(nav => {
                const isActive =
                    nav.href === '/'
                        ? pathname === '/' || pathname.startsWith('/brawler')
                        : pathname.startsWith(nav.href);

                return (
                    <li
                        key={nav.label}
                        className="shrink-0">
                        <Link
                            href={nav.href}
                            className={isActive ? '' : 'text-muted'}>
                            {nav.label}
                        </Link>
                    </li>
                );
            })}
            <li className="py-1.5 px-2.5 sm:py-2.5 sm:px-4.5 border border-line bg-surface rounded-full flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Heart
                    strokeWidth={2.4}
                    color="#FF2056"
                    className="size-4 sm:size-[22px] fill-rose-500 shrink-0"
                />
                <span className="hidden sm:inline">Favorites</span>
                <span className="text-[11px] sm:text-[13px] leading-none text-background font-semibold bg-[#ff4d6d] rounded-full min-w-[18px] h-[18px] sm:min-w-[22px] sm:h-[22px] px-1.5 inline-flex items-center justify-center shrink-0">
                    {favoriteBrawlers.length}
                </span>
            </li>
        </ul>
    );
}
