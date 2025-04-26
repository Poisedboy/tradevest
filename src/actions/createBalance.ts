'use server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Market } from '@prisma/client';
import { getServerSession } from 'next-auth';

export const createBalance = async ({
	balance,
	market,
}: {
	balance: number;
	market: Market;
}): Promise<{ ok: boolean; message: string }> => {
	try {
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return { ok: false, message: 'User not authenticated' };
		}
		const res = await prisma.balance.create({
			data: {
				balance,
				market,
				userId: session.user.id,
			},
		});
		if (!res) {
			throw new Error('Failed to create balance');
		}

		return { ok: true, message: 'Balance created successfully' };
	} catch (error) {
		console.error('Error creating balance:', error);
		return { ok: false, message: 'Error creating balance' };
	}
};
