'use server';

import { prisma } from '@/lib/prisma';
import { SignupFormType } from '@/types/forms.types';
import bcrypt from 'bcryptjs';

export const createUser = async ({
	email,
	password,
	firstName,
	lastName,
	market,
	balance,
}: SignupFormType): Promise<{ message: string; ok: boolean }> => {
	if (!email || !password) {
		return { message: 'Email and password are required', ok: false };
	}
	try {
		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return { message: 'User already exists', ok: false };
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				firstName,
				lastName,
				password: hashedPassword,
			},
		});
		await prisma.balance.create({
			data: {
				market,
				balance: balance ?? 0.0,
				user: {
					connect: {
						id: user.id,
					},
				},
			},
		});
		return {
			message: `User ${user.firstName} ${user.lastName} was successfully created!`,
			ok: true,
		};
	} catch (error) {
		return { message: error as string, ok: false };
	}
};
