import { Positions } from '@/components/positions/Positions';
import { PanelSection } from '@/components/positions/PanelSection';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function PositionsPage() {
	const session = await getServerSession(authOptions);
	const rawBalances = await prisma.balance.findMany({
		where: { userId: session?.user.id },
	});
	const balances = rawBalances.map((balance) => ({
		...balance,
		balance: balance.balance.toNumber(),
	}));
	return (
		<div className="paddingX space-y-5">
			<PanelSection balances={balances} />
			<Positions />
		</div>
	);
}
