'use client';
import FeedbackForm from '@/app/components/feedback/FeedbackForm';

const NOTES = [
    'Name the brawler, map or mode so we can find it fast.',
    'Say what you expected and what you saw instead.',
    'Game data comes from BrawlAPI, so some fixes may need to happen there.',
];

export default function FeedBack() {
    return (
        <div className="wrapper flex flex-wrap items-start gap-14 pb-24">
            <div className="flex flex-1 basis-95 flex-col gap-6 pt-4">
                <p className="pill-gold mb-3">Feedback</p>
                <h1>
                    Spotted something <span className="text-gold">off?</span>
                </h1>
                <p>
                    Wrong description, missing map or an idea for BrawlDex? Tell
                    us and we will take a look.
                </p>

                <div className="flex flex-col gap-3.5">
                    {NOTES.map((note, index) => (
                        <div
                            key={index}
                            className="flex gap-3.5 rounded-3xl border border-line bg-surface px-5 py-4.5">
                            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gold font-display text-[20px] text-background">
                                {index + 1}
                            </div>
                            <p>{note}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="min-w-0 flex-1 basis-130">
                <FeedbackForm />
            </div>
        </div>
    );
}
