import { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

const fallbackItems = ['Brawlers', 'Maps', 'Modes', 'Icons'];

export default function Navbar() {
    return (
        <header className="wrapper py-6 sm:py-8 md:py-10">
            <nav className="flex justify-between items-center gap-4">
                <Link
                    href="/"
                    className="text-2xl sm:text-[30px] font-display text-gold text-shadow-[0_3px_0_#7a5a00]">
                    BrawlDex
                </Link>

                <Suspense
                    fallback={
                        <ul className="font-medium flex gap-3.5 sm:gap-6 text-sm sm:text-base text-muted">
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
