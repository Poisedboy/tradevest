'use server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PositionFormType, positionSchema } from '@/types/forms.types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const createPosition = async (
	position: PositionFormType,
): Promise<{ message: string; ok: boolean }> => {
	const result = positionSchema.safeParse(position);
	if (result.error) {
		return { message: result.error.message, ok: false };
	}
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return { message: 'User not found', ok: false };
		}

		const positionData = await prisma.position.create({
			data: {
				userId: session.user.id,
				market: position.market,
				pair: position.pair,
				entryPrice: position.entryPrice,
				exitPrice: position.exitPrice,
				volume: position.volume,
				profitLoss: position.profitLoss,
				positionType: position.positionType,
				status: position.status,
			},
		});

		if (positionData) {
			const balance = await prisma.balance.update({
				where: {
					userId: session.user.id,
				},
				data: {
					total: {
						increment: position.profitLoss,
					},
				},
			});
			if (!balance) {
				return { message: 'Balance not updated', ok: false };
			} else {
				revalidatePath('/dashboard');
				return {
					message: 'Position created successfully',
					ok: true,
				};
			}
		} else {
			return { message: 'Position not created', ok: false };
		}
	} catch (error) {
		return { message: error as string, ok: false };
	}
};
