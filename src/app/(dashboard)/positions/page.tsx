import { getPositions } from '@/actions/getPositions';
import { Positions } from '@/components/list/Positions';
import { PanelSection } from '@/components/PanelSection';

export default async function PositionsPage() {
	const positions = await getPositions();
	return (
		<div className="paddingX space-y-5">
			<PanelSection />
			<Positions positions={positions?.data ?? []} />
		</div>
	);
}
