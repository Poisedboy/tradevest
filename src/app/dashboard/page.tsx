import { getStatistic } from '@/actions/getStatistic';
import { PanelSection } from '@/components/PanelSection';
import { StatisticSection } from '@/components/StatisticSection';

export default async function DashboardPage() {
	const { balance, firstName, positions } = await getStatistic();
	return (
		<div className="paddingX space-y-5">
			<StatisticSection
				balance={balance}
				positions={positions}
				username={firstName}
			/>
			<PanelSection />
		</div>
	);
}
