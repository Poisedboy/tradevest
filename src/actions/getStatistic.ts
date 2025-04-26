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
	const positions = await prisma.position.findMany({
		where: {
			balanceId: { in: balanceIds },
		},
	});
	return {
		balance: balances.reduce(
			(sum, balance) => sum + balance.balance.toNumber(),
			0,
		),
		positionsQnty: positions.length,
		firstName: session?.user.firstName,
	};
};
