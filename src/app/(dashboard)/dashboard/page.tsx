import { getStatistic } from '@/actions/getStatistic';
import { StatisticSection } from '@/components/StatisticSection';

export default async function DashboardPage() {
	const { balance, firstName, positionsQnty } = await getStatistic();
	return (
		<div className="paddingX space-y-5">
			<StatisticSection
				balance={balance}
				positions={positionsQnty}
				username={firstName}
			/>

			{/* <PositionChart positions={positions} /> */}
		</div>
	);
}
