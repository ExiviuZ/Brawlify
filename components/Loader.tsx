// app/loading.tsx
export default function Loading() {
    return (
        <div
            role="status"
            aria-busy="true"
            className="flex min-h-[70vh] flex-col items-center justify-center gap-6 sm:gap-8 p-6 sm:p-12">
            <span className="sr-only">Loading…</span>

            {/* Spinner */}
            <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                <div className="absolute inset-0 animate-pulse rounded-full bg-[#fe5e72]/30 blur-2xl" />
                <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] border-[#0d1030] bg-[#232857]" />
                <div className="absolute inset-0 animate-spin rounded-full border-[8px] sm:border-[10px] border-transparent border-t-[#ffce00] border-r-[#fe5e72]" />
                <div className="absolute inset-[22px] sm:inset-[26px] flex animate-pulse items-center justify-center rounded-full border-4 border-[#0d1030] bg-[#ffce00] text-2xl sm:text-3xl shadow-[0_4px_0_#0d1030]">
                    ⭐
                </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-[#ffce00] drop-shadow-[0_3px_0_#0d1030]">
                Loading
                <span className="inline-flex w-8 justify-start">
                    {[0, 1, 2].map(i => (
                        <span
                            key={i}
                            className="animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }}>
                            .
                        </span>
                    ))}
                </span>
            </h2>
        </div>
    );
}
