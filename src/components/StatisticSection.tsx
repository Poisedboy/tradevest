import { CircleUser, DollarSign, FileSpreadsheet } from 'lucide-react';

type StatisticProps = {
	balance?: number;
	positions: number;
	username: string;
};

export const StatisticSection: React.FC<StatisticProps> = ({
	balance,
	positions,
	username,
}: StatisticProps) => {
	return (
		<div className="flex flex-col sm:flex-row justify-between gap-5">
			<div className="flex items-center gap-3 w-full bg-muted p-4 rounded-lg">
				<div className="bg-[#3a86ff]/30 p-2 rounded-full">
					<CircleUser color="#3a86ff" size={45} />
				</div>
				<div>
					<h2 className="paragraph">Welcome</h2>
					<p className="subtitle font-semibold">{username}</p>
				</div>
			</div>
			<div className="flex items-center gap-3 w-full bg-muted p-4 rounded-lg">
				<div className="bg-[#d62246]/30 p-2 rounded-full">
					<DollarSign color="#d62246" size={45} />
				</div>
				<div>
					<h2 className="paragraph truncate ...">Current Balance</h2>
					<p className="subtitle font-semibold">$ {balance}</p>
				</div>
			</div>
			<div className="flex items-center gap-3 w-full bg-muted p-4 rounded-lg">
				<div className="bg-[#f26419]/30 p-2 rounded-full">
					<FileSpreadsheet color="#f26419" size={45} />
				</div>
				<div>
					<h2 className="paragraph">Positions</h2>{' '}
					<p className="subtitle font-semibold">{positions}</p>
				</div>
			</div>
		</div>
	);
};
