'use server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PositionFormType, positionSchema } from '@/types/forms.types';
import { Balance } from '@prisma/client';
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
		const balanceId = session.user.balance.find(
			(balance: Balance) => balance.market === position.market,
		).id;
		const positionData = await prisma.position.create({
			data: {
				balanceId: balanceId,
				pair: position.pair,
				entryPrice: position.entryPrice,
				exitPrice: position.exitPrice,
				entryTime: position.entryTime,
				exitTime: position.exitTime,
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
					balance: {
						increment: position.profitLoss,
					},
				},
			});
			if (!balance) {
				return { message: 'Balance not updated', ok: false };
			} else {
				revalidatePath('/dashboard');
				revalidatePath('/positions');
				return {
					message: 'Position created successfully',
					ok: true,
				};
			}
		} else {
			return { message: 'Position not created', ok: false };
		}
	} catch (e) {
		console.error(e);
		return { message: 'Server error', ok: false };
	}
};
