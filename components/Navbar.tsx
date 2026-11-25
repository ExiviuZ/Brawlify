import { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

const fallbackItems = ['Brawlers', 'Maps', 'Modes', 'Icons'];

export default function Navbar() {
    return (
        <header className="wrapper py-4 sm:py-8 md:py-10 sticky top-0 z-1000 bg-background">
            <nav className="flex flex-wrap md:flex-nowrap justify-between items-center gap-y-3 gap-x-4">
                <Link
                    href="/"
                    className="text-xl sm:text-2xl md:text-[30px] font-display text-gold text-shadow-[0_3px_0_#7a5a00] shrink-0">
                    BrawlDex
                </Link>

                <Suspense
                    fallback={
                        <ul className="font-medium flex gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-muted">
                            {fallbackItems.map(label => (
                                <li key={label}>{label}</li>
                            ))}
                        </ul>
                    }>
                    <NavLinks />
                </Suspense>
            </nav>
        </header>
    );
}
