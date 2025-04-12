import {z} from 'zod';
import {JobFormState} from '@/types';

// Job name - 3-50 chars, alphanumeric and dashes
const nameRegex = /^[a-zA-Z0-9-]+$/;

// Form validation
export const jobFormSchema = z
    .object({
        name: z
            .string()
            .min(3, {message: 'Job name must be at least 3 characters'})
            .max(50, {message: 'Job name must be at most 50 characters'})
            .regex(nameRegex, {
                message: 'Job name must contain only alphanumeric characters and dashes',
            }),
        baseModel: z.string().min(1, {message: 'Please select a base model'}),
        epochs: z
            .number()
            .min(1, {message: 'Epochs must be at least 1'}),
        evaluationEpochs: z
            .number()
            .min(0, {message: 'Evaluation epochs must be at least 0'}),
        warmupEpochs: z
            .number()
            .min(0, {message: 'Warmup epochs must be at least 0'}),
        learningRate: z
            .number()
            .min(0, {message: 'Learning rate must be at least 0'})
            .max(1, {message: 'Learning rate must be at most 1'}),
    })
    .superRefine((data, ctx) => {
        if (data.evaluationEpochs > data.epochs) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Evaluation epochs cannot exceed total epochs',
                path: ['evaluationEpochs'],
            });
        }

        if (data.warmupEpochs > data.epochs) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Warmup epochs cannot exceed total epochs',
                path: ['warmupEpochs'],
            });
        }

        if (data.warmupEpochs + data.evaluationEpochs > data.epochs) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    'Sum of warmup and evaluation epochs cannot exceed total epochs',
                path: ['warmupEpochs'],
            });
        }
    });

export const validateJobForm = (data: JobFormState) => {
    const result = jobFormSchema.safeParse(data);

    if (!result.success) {
        const formattedErrors: Record<string, string> = {};

        result.error.errors.forEach((error) => {
            const path = error.path.join('.');
            formattedErrors[path] = error.message;
        });

        return {valid: false, errors: formattedErrors};
    }

    return {valid: true, errors: {}};
};

export type JobFormData = z.infer<typeof jobFormSchema>;
