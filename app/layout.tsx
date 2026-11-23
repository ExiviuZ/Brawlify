import type { Metadata } from 'next';
import { Inter, Lilita_One } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const lilitaOne = Lilita_One({
    variable: '--font-lilita-one',
    weight: '400',
    subsets: ['latin'],
});

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'BrawlDex',
        template: '%s · BrawlDex',
    },
    description:
        'A free Brawl Stars companion — browse every brawler, star power, gadget, and map in one place.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${lilitaOne.variable} ${inter.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
