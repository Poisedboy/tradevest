'use client';

import { Button } from '../ui/button';
import { Market } from '@prisma/client';
import { Card } from '../ui/card';
import useMarket from '@/store/useMarket';
import { PositionForm } from './PositionForm';

type BalanceWithNumber = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	balance: number;
	userId: string;
	market: Market;
};

type Props = {
	balances: BalanceWithNumber[];
};

export const PanelSection: React.FC<Props> = ({ balances }) => {
	const { market, setMarket } = useMarket();

	const selectedBalance = balances?.find(
		(balance) => balance.market === market,
	);
	return (
		<Card className="w-full flex flex-row justify-between border-0 p-4">
			<PositionForm />
			<div className="flex gap-2 items-center">
				<p>{String(selectedBalance?.balance)}</p>
				{balances?.map((balance: BalanceWithNumber) => (
					<Button
						key={balance.id}
						variant={market === balance.market ? 'default' : 'outline'}
						onClick={() => setMarket(balance.market)}
					>
						{balance.market}
					</Button>
				))}
			</div>
		</Card>
	);
};
