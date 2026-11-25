import Link from 'next/link';
import { ComponentProps } from 'react';
import { pillBase, pillVariants } from '@/components/pill-styles';

type ButtonLinkProps = ComponentProps<typeof Link> & {
    variant?: keyof typeof pillVariants;
};

export default function PillButton({
    variant = 'gold',
    className = '',
    ...props
}: ButtonLinkProps) {
    return (
        <Link
            {...props}
            className={`${pillBase} w-max ${pillVariants[variant]} ${className}`}
        />
    );
}
