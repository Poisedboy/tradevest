import { Market } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MarketState {
	market: Market;
	setMarket: (newMarket: Market) => void;
}

const useMarket = create<MarketState>()(
	persist(
		(set) => ({
			market: Market.FOREX,
			setMarket: (market: Market) => set(() => ({ market })),
		}),
		{ name: 'market-store' },
	),
);

export default useMarket;
