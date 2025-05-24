'use server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Balance, Market } from '@prisma/client';
import { getServerSession } from 'next-auth';

export const getPositions = async ({
	page = 1,
	limit = 10,
	market = Market.FOREX,
}: {
	page: number;
	limit: number;
	market: Market;
}) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return { data: null, error: 'No session' };
		}

		const balances = await prisma.balance.findMany({
			where: { userId: session.user.id },
		});

		const balanceId = balances?.find((i: Balance) => i.market === market)?.id;

		page = Math.max(1, page);
		const [total, positions] = await Promise.all([
			prisma.position.count({
				where: { balanceId },
			}),
			prisma.position.findMany({
				where: { balanceId },
				orderBy: { createdAt: 'desc' },
				skip: (page - 1) * limit,
				take: limit,
			}),
		]);

		return {
			data: {
				positions,
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
			error: null,
		};
	} catch (error) {
		console.error('Error fetching positions:', error);
		return {
			data: null,
			error: 'Failed to fetch positions',
		};
	}
};
