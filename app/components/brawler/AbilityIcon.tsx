'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
    src?: string | null;
    alt: string;
    kind: 'star' | 'gadget';
};

export default function AbilityIcon({ src, alt, kind }: Props) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <IconPlaceholder
                kind={kind}
                label={alt}
            />
        );
    }

    return (
        <div className="relative size-20 shrink-0">
            <Image
                className="object-contain"
                src={src}
                alt={alt}
                sizes="80px"
                fill
                onError={() => setFailed(true)}
            />
        </div>
    );
}

// Matches the design: gold rounded square + star, green circle + gear
function IconPlaceholder({
    kind,
    label,
}: {
    kind: 'star' | 'gadget';
    label: string;
}) {
    const isStar = kind === 'star';

    return (
        <div
            role="img"
            aria-label={label}
            className={`grid size-20 shrink-0 place-items-center ${
                isStar
                    ? 'rounded-3xl bg-gold shadow-[0_6px_0_#7a5a00]'
                    : 'rounded-full bg-[#2edd1d] shadow-[0_6px_0_#14700c]'
            }`}>
            {isStar ? (
                <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="#0f1226"
                    aria-hidden="true">
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
                </svg>
            ) : (
                <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0f1226"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true">
                    <circle
                        cx="12"
                        cy="12"
                        r="3"
                    />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
                </svg>
            )}
        </div>
    );
}
