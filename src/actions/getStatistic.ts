'use server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export const getStatistic = async () => {
	const session = await getServerSession(authOptions);
	const balance = await prisma.balance.findUnique({
		where: {
			userId: session?.user.id,
		},
		select: {
			total: true,
		},
	});
	const positions = await prisma.position.findMany({
		where: {
			userId: session?.user.id,
		},
	});
	return {
		balance: balance?.total.toNumber(),
		positions: positions.length,
		firstName: session?.user.firstName,
	};
};
