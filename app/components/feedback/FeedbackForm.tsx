'use client';

import { Check, CircleAlert } from 'lucide-react';
import { pillBase, pillVariants } from '@/components/pill-styles';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const TOPICS = [
    { value: 'bug', label: 'Something is broken' },
    { value: 'data', label: 'Wrong data' },
    { value: 'idea', label: 'Idea' },
    { value: 'other', label: 'Other' },
] as const;

const feedbackSchema = z
    .object({
        name: z.string().trim().min(1, 'Please enter your name'),
        email: z.email('Please enter a valid email address'),
        topic: z.string().min(1, 'Please select a topic'),
        page: z.string().optional(),
        message: z
            .string()
            .trim()
            .min(1, 'Please enter a message')
            .max(500, 'Message must be 500 characters or fewer'),
        agree: z.literal(true, {
            error: 'You must agree before sending feedback',
        }),
    })
    .superRefine((data, ctx) => {
        if (data.topic === 'data' && !data.page?.trim()) {
            ctx.addIssue({
                code: 'custom',
                path: ['page'],
                message: 'Please specify the brawler, map, or mode',
            });
        }
    });

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const inputClass =
    'w-full min-h-13 rounded-2xl border-[1.5px] border-line bg-background px-4.5 text-base font-medium text-foreground outline-none transition placeholder:text-muted focus:border-gold focus:ring-3 focus:ring-gold/30 aria-invalid:border-[#ff4d6d]';

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) return null;
    return (
        <p
            id={id}
            role="alert"
            className="flex items-center gap-2 text-sm text-[#ff8a9f]">
            <CircleAlert
                size={16}
                strokeWidth={2.6}
                aria-hidden="true"
            />
            {message}
        </p>
    );
}

function Field({
    id,
    label,
    error,
    aside,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    aside?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
                <label
                    htmlFor={id}
                    className="text-sm font-semibold text-soft">
                    {label}
                </label>
                {aside}
            </div>
            {children}
            <FieldError
                id={`${id}-error`}
                message={error}
            />
        </div>
    );
}

export default function FeedbackForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            name: '',
            email: '',
            topic: '',
            page: '',
            message: '',
        },
    });

    const selectedTopic = watch('topic');
    const messageValue = watch('message') ?? '';

    const onSubmit: SubmitHandler<FeedbackFormData> = data => {
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6.5 rounded-[36px] border border-line bg-surface p-6 shadow-[0_28px_64px_rgba(0,0,0,.4)] sm:p-10">
            <div>
                <h2 className="font-display text-4xl">Send feedback</h2>
                <p className="mt-1.5 text-[15px] text-muted">
                    Fields marked with * are required.
                </p>
            </div>

            {/* Name + email */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
                <Field
                    id="name"
                    label="Name *"
                    error={errors.name?.message}>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                            errors.name ? 'name-error' : undefined
                        }
                        className={inputClass}
                        {...register('name')}
                    />
                </Field>
                <Field
                    id="email"
                    label="Email *"
                    error={errors.email?.message}>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                            errors.email ? 'email-error' : undefined
                        }
                        className={inputClass}
                        {...register('email')}
                    />
                </Field>
            </div>

            {/* Topic: native radios styled as pills */}
            <fieldset className="flex flex-col gap-2.5">
                <legend className="mb-2.5 text-sm font-semibold text-soft">
                    What is this about? *
                </legend>
                <div className="flex flex-wrap gap-2.5">
                    {TOPICS.map(t => (
                        <label
                            key={t.value}
                            className="cursor-pointer">
                            <input
                                type="radio"
                                value={t.value}
                                aria-invalid={!!errors.topic}
                                className="peer sr-only"
                                {...register('topic')}
                            />
                            <span className="flex min-h-11 items-center rounded-full border-[1.5px] border-line bg-background px-5 text-sm font-semibold transition peer-checked:border-gold peer-checked:bg-gold peer-checked:text-background peer-focus-visible:ring-3 peer-focus-visible:ring-gold/60 peer-aria-invalid:border-[#ff4d6d]">
                                {t.label}
                            </span>
                        </label>
                    ))}
                </div>
                <FieldError
                    id="topic-error"
                    message={errors.topic?.message}
                />
            </fieldset>

            {/* Only shown when topic === 'data' */}
            {selectedTopic === 'data' && (
                <Field
                    id="page"
                    label="Which brawler, map or mode? *"
                    error={errors.page?.message}>
                    <input
                        id="page"
                        type="text"
                        placeholder="For example: Vince or Temple Ruins"
                        aria-invalid={!!errors.page}
                        aria-describedby={
                            errors.page ? 'page-error' : undefined
                        }
                        className={inputClass}
                        {...register('page', { shouldUnregister: true })}
                    />
                </Field>
            )}

            {/* Message */}
            <Field
                id="message"
                label="Message *"
                error={errors.message?.message}
                aside={
                    <span className="text-[13px] font-medium text-muted">
                        {messageValue.length} / 500
                    </span>
                }>
                <textarea
                    id="message"
                    rows={6}
                    maxLength={500}
                    placeholder="What did you notice? The more detail, the better."
                    aria-invalid={!!errors.message}
                    aria-describedby={
                        errors.message ? 'message-error' : undefined
                    }
                    className={`${inputClass} min-h-40 resize-y py-3.5 leading-relaxed`}
                    {...register('message')}
                />
            </Field>

            {/* Consent: native checkbox with a custom box */}
            <div className="flex flex-col gap-2">
                <label className="flex cursor-pointer items-center gap-3.5 text-[15px] text-soft">
                    <input
                        type="checkbox"
                        aria-invalid={!!errors.agree}
                        aria-describedby={
                            errors.agree ? 'agree-error' : undefined
                        }
                        className="peer sr-only"
                        {...register('agree')}
                    />
                    <span className="grid size-6.5 shrink-0 place-items-center rounded-lg border-[1.5px] border-[#3a4090] bg-background transition peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:ring-3 peer-focus-visible:ring-gold/60 peer-aria-invalid:border-[#ff4d6d] [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                        <Check
                            size={16}
                            strokeWidth={3.6}
                            className="text-background"
                            aria-hidden="true"
                        />
                    </span>
                    It is fine to email me about this report. *
                </label>
                <FieldError
                    id="agree-error"
                    message={errors.agree?.message}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`${pillBase} ${pillVariants.gold} min-h-14 w-full text-base sm:text-base md:text-base disabled:opacity-60`}>
                {isSubmitting ? 'Sending...' : 'Send feedback'}
            </button>
        </form>
    );
}
