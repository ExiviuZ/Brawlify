'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
    fullName: z.string().trim().min(1, 'Full name is required'),
    email: z.email('Enter a valid email address').min(1, 'Email is required'),
    age: z.number({ error: 'Age is required' }).min(18, 'Must be at least 18'),
    role: z.enum(['developer', 'designer', 'student'], {
        error: 'Please select a role',
    }),
    bio: z.string().trim().min(1, 'Short bio is required'),
    agreedToTerms: z.literal(true, {
        error: 'You must agree to the terms',
    }),
});

type FormFields = z.infer<typeof profileSchema>;

export default function TestPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>({ resolver: zodResolver(profileSchema) });

    const onSubmit: SubmitHandler<FormFields> = data => {
        console.log(data);
    };

    const inputBaseClass =
        'border p-2 w-full rounded outline-none transition-colors';
    const getInputBorder = (hasError: boolean) =>
        hasError
            ? 'border-red-500 focus:border-red-500 bg-red-50/30'
            : 'border-gray-300 focus:border-blue-500';

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
            <h1 className="text-xl font-bold mb-1">Profile Setup</h1>
            <p className="text-sm text-gray-500 mb-6">
                Plain HTML form boilerplate ready for React Hook Form + Zod.
            </p>
            <form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate>
                {/* 1. Text Input */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Full Name
                    </label>
                    <input
                        {...register('fullName')}
                        type="text"
                        placeholder="Juan Dela Cruz"
                        className={`${inputBaseClass} ${getInputBorder(!!errors.fullName)}`}
                    />
                    {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* 2. Email Input */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="juan@example.com"
                        className={`${inputBaseClass} ${getInputBorder(!!errors.email)}`}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* 3. Number Input */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Age
                    </label>
                    <input
                        {...register('age', { valueAsNumber: true })}
                        type="number"
                        placeholder="25"
                        className={`${inputBaseClass} ${getInputBorder(!!errors.age)}`}
                    />
                    {errors.age && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.age.message}
                        </p>
                    )}
                </div>

                {/* 4. Select Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Role
                    </label>
                    <select
                        {...register('role')}
                        className={`${inputBaseClass} bg-white ${getInputBorder(!!errors.role)}`}>
                        <option value="">Select a role...</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="student">Student</option>
                    </select>
                    {errors.role && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                {/* 5. Textarea */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Short Bio
                    </label>
                    <textarea
                        {...register('bio')}
                        rows={3}
                        placeholder="Tell us a little about yourself..."
                        className={`${inputBaseClass} ${getInputBorder(!!errors.bio)}`}
                    />
                    {errors.bio && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.bio.message}
                        </p>
                    )}
                </div>

                {/* 6. Checkbox */}
                <div>
                    <div className="flex items-center gap-2">
                        <input
                            {...register('agreedToTerms')}
                            type="checkbox"
                            id="terms"
                            className={`h-4 w-4 rounded ${
                                errors.agreedToTerms
                                    ? 'accent-red-600 ring-1 ring-red-500'
                                    : ''
                            }`}
                        />
                        <label
                            htmlFor="terms"
                            className={`text-sm ${
                                errors.agreedToTerms ? 'text-red-600' : ''
                            }`}>
                            I agree to the terms and conditions
                        </label>
                    </div>
                    {errors.agreedToTerms && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.agreedToTerms.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors">
                    Save Profile
                </button>
            </form>
        </div>
    );
}
