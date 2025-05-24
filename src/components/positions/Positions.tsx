'use client';

import { Position, PositionType } from '@prisma/client';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { useNotification } from '@/hooks/useNotification';
import { getPositions } from '@/actions/getPositions';
import debounce from 'lodash.debounce';
import useMarket from '@/store/useMarket';
import { MonitorX } from 'lucide-react';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

export const Positions = () => {
	const { errorToast } = useNotification();

	const { market } = useMarket();
	const [positions, setPositions] = useState<Position[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	// const [currentPage, setCurrentPage] = useState<number>(0);
	// const [total, setTotal] = useState<number>(0);
	const getListings = async () => {
		try {
			setLoading(true);
			const response = await getPositions({ page: 0, limit: 15, market });
			if (response?.data) {
				setPositions(response.data.positions);
			}
		} catch (error) {
			errorToast('An error occured: ' + error);
		} finally {
			setLoading(false);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedGetListings = useCallback(debounce(getListings, 500), [
		market,
	]);

	useEffect(() => {
		debouncedGetListings();
		return () => debouncedGetListings.cancel();
	}, [debouncedGetListings]);

	return (
		<div className="space-y-5">
			{isLoading ? (
				<div className="flex flex-col gap-5 items-center w-full">
					<div className="flex items-center justify-center space-x-2">
						<span className="h-4 w-4 rounded-full bg-indigo-500 animate-pulse"></span>
						<span className="h-4 w-4 rounded-full bg-indigo-500 animate-pulse [animation-delay:0.2s]"></span>
						<span className="h-4 w-4 rounded-full bg-indigo-500 animate-pulse [animation-delay:0.4s]"></span>
					</div>
					<p>Loading...</p>
				</div>
			) : positions.length === 0 ? (
				<div className="flex flex-col gap-5 items-center w-full">
					<MonitorX size={100} />
					<p className="">No data. Try later again.</p>
				</div>
			) : (
				<Table>
					<TableCaption>Positions Table</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Pair</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Volume</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Profit/Loss</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Time</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{positions?.map((position) => (
							<PositionCard key={position.id} {...position} />
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
};

function PositionCard({
	positionType,
	volume,
	profit,
	pair,
	entryPrice,
	entryTime,
	exitPrice,
	exitTime,
	status,
}: Position) {
	const profitLossColor =
		Number(profit) >= 0 ? 'text-green-500' : 'text-red-500';
	const positionTypeColor =
		positionType === PositionType.LONG ? 'text-green-500' : 'text-red-500';

	const formatDate = (date: Date) => format(date, 'dd/MM/yy, HH:mm');
	return (
		<TableRow>
			<TableCell>{pair}</TableCell>
			<TableCell>{status}</TableCell>
			<TableCell>{String(volume)}</TableCell>
			<TableCell className={cn('text-sm', positionTypeColor)}>
				{positionType}
			</TableCell>
			<TableCell className={cn(profitLossColor)}>{String(profit)}</TableCell>
			<TableCell>
				<p>Entry - {entryPrice}</p> {exitPrice && <p>Exit - {exitPrice}</p>}
			</TableCell>
			<TableCell>
				<p>Entry - {formatDate(entryTime)}</p>{' '}
				{exitTime && <p>Exit - {formatDate(exitTime)}</p>}
			</TableCell>
		</TableRow>
	);
}
