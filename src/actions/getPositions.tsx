'use server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export const getPositions = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return null;
		}
		const positions = await prisma.position.findMany({
			where: {
				balanceId: session.user.balance[0].id,
			},
		});
		return { data: positions, error: null };
	} catch (error) {
		console.error('Error fetching positions:', error);
		return {
			data: null,
			error: 'Failed to fetch positions',
		};
	}
};
