import {z} from 'zod';

export const userSearchSchema = z.object({
    firstName: z.string().default(''),
    lastName: z.string().default(''),
    major: z
        .union([
            z.literal(''),
            z.enum(['design', 'content', 'programming', 'marketing']),
        ])
        .default(''),
});
