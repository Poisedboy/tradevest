'use server';

import { BalanceSection } from '@/components/BalanceSection';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function SettingsPage() {
	const session = await getServerSession(authOptions);
	const res = await prisma.balance.findMany({
		where: { userId: session?.user.id },
	});
	const balances = res.map((balance) => ({
		...balance,
		balance: Number(balance.balance),
	}));
	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="title">Settings</h1>
			<BalanceSection balances={balances} />
		</div>
	);
}
