import Image from 'next/image';

interface BrawlerSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function BrawlerSearch({
    value,
    onChange,
    placeholder = 'Search brawlers by name',
}: BrawlerSearchProps) {
    return (
        <div
            className={`w-full max-w-140 rounded-full border border-line flex items-center px-4 sm:px-6 min-h-12 sm:min-h-15 gap-3 bg-background flex-1 lg:min-w-114.5`}>
            <Image
                src="/search.svg"
                alt="Search"
                width={20}
                height={20}
                className="size-5 sm:size-[22px]"
            />
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="placeholder:font-medium w-full outline-none text-sm sm:text-base"
            />
        </div>
    );
}
