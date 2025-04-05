import { Market, PositionStatus, PositionType } from '@prisma/client';
import { z } from 'zod';

export const signupSchema = z.object({
	email: z.string().min(1, { message: 'Email is required' }).email(),
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	market: z.nativeEnum(Market),
	balance: z.number().nonnegative({ message: 'Balance must be 0 or greater' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
});

export type SignupFormType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
	email: z.string().min(1, { message: 'Email is required' }).email(),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
});

export type SigninFormType = z.infer<typeof signinSchema>;

export const positionSchema = z.object({
	pair: z.string().min(1, 'Pair is required'),
	entryPrice: z.number().positive('must be greater than 0'),
	exitPrice: z.number().positive('must be greater than 0'),
	market: z.nativeEnum(Market),
	entryTime: z.date(),
	exitTime: z.date(),
	volume: z.number().positive('must be greater than 0'),
	profitLoss: z.number(),
	positionType: z.nativeEnum(PositionType),
	status: z.nativeEnum(PositionStatus),
});

export type PositionFormType = z.infer<typeof positionSchema>;
