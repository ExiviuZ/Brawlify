'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { label: 'Brawlers', href: '/' },
    { label: 'Maps', href: '/projects' },
    { label: 'Modes', href: '/about' },
    { label: 'Icons', href: '/icons' },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <ul className="font-medium flex gap-3.5 sm:gap-6 text-sm sm:text-base">
            {navItems.map(nav => {
                const isActive =
                    nav.href === '/'
                        ? pathname === '/' || pathname.startsWith('/brawler')
                        : pathname.startsWith(nav.href);

                return (
                    <li key={nav.label}>
                        <Link
                            href={nav.href}
                            className={isActive ? '' : 'text-muted'}>
                            {nav.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
