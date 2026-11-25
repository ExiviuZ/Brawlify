export const pillVariants = {
    gold: 'bg-gold text-background border-transparent shadow-[0_5px_0_var(--color-gold)]/40 hover:shadow-[0_7px_0_var(--color-gold)]/40 active:shadow-[0_1px_0_var(--color-gold)]/60',
    dark: 'bg-surface text-foreground border-[#3a4090] shadow-[0_5px_0_#070916] hover:shadow-[0_7px_0_#070916] active:shadow-[0_1px_0_#070916]',
};

// No width utility here, so each caller picks its own (w-max, w-full, ...)
export const pillBase =
    'inline-flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-[15px] font-bold transition-all hover:-translate-y-0.5 active:translate-y-1 disabled:pointer-events-none disabled:opacity-60';
