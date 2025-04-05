import { Position } from '@prisma/client';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

export const Positions = ({ positions }: { positions?: Position[] }) => {
	return (
		<div className="space-y-5">
			{positions?.map((position) => (
				<PositionCard key={position.id} {...position} />
			))}
		</div>
	);
};

function PositionCard({ positionType, volume, profitLoss }: Position) {
	const profitLossColor =
		Number(profitLoss) >= 0 ? 'text-green-500' : 'text-red-500';
	return (
		<Card className="border-0 p-4 grid grid-cols-4">
			<div className="text-sm text-gray-500">{positionType}</div>
			<div className="text-sm text-gray-500">{String(volume)}</div>
			<div className={cn(profitLossColor)}>{String(profitLoss)}</div>
		</Card>
	);
}
