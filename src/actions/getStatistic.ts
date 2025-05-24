'use server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export const getStatistic = async () => {
	const session = await getServerSession(authOptions);
	const balances = await prisma.balance.findMany({
		where: {
			userId: session?.user.id,
		},
	});
	const balanceIds = balances.map((balance) => balance.id);
	const positionsQnty = await prisma.position.count({
		where: {
			balanceId: { in: balanceIds },
		},
	});
	return {
		balance: balances.reduce(
			(sum, balance) => sum + balance.balance.toNumber(),
			0,
		),
		positionsQnty: positionsQnty,
		firstName: session?.user.firstName,
	};
};
