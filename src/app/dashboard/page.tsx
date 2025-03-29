import { getStatistic } from '@/actions/getStatistic';
import { StatisticSection } from '@/components/StatisticSection';

export default async function DashboardPage() {
	const { balance, firstName, positions } = await getStatistic();
	return (
		<div className="paddingX">
			<StatisticSection
				balance={balance}
				positions={positions}
				username={firstName}
			/>
		</div>
	);
}
