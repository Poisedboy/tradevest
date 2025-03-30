'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { Market, PositionStatus, PositionType } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { PositionFormType, positionSchema } from '@/types/forms.types';
import { Input } from './ui/input';
import { Modal } from './Modal';
import { Combobox } from './Combobox';
import { useNotification } from '@/hooks/useNotification';
import { createPosition } from '@/actions/createPosition';

export const PanelSection: React.FC = () => {
	const { successToast, errorToast } = useNotification();
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(positionSchema),
		defaultValues: {
			market: Market.FOREX,
			pair: '',
			entryPrice: 0,
			exitPrice: 0,
			volume: 0,
			profitLoss: 0,
			positionType: PositionType.LONG,
			status: PositionStatus.OPEN,
		},
	});

	async function onSubmit(values: PositionFormType) {
		const { message, ok } = await createPosition(values);
		if (ok) {
			form.reset();
			setIsOpen(false);
			successToast(message);
		} else {
			errorToast(message);
		}
	}
	return (
		<div className="w-full bg-muted rounded-lg p-4">
			<Button
				variant={'outline'}
				size={'icon'}
				className="rounded-lg"
				onClick={() => setIsOpen(true)}
			>
				<PlusIcon size={24} />
			</Button>
			{isOpen && (
				<Modal open={isOpen} title="Add Position" className="w-fit">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
							<div className="flex flex-col md:flex-row gap-3">
								<FormField
									control={form.control}
									name="market"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Market</FormLabel>
											<FormControl>
												<Combobox variants={Object.keys(Market)} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="pair"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Pair</FormLabel>
											<FormControl>
												<Input placeholder="EUR/USD or BTC/USDT" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col md:flex-row gap-3">
								<FormField
									control={form.control}
									name="positionType"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Position Type</FormLabel>
											<FormControl>
												<Combobox
													variants={Object.keys(PositionType)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Status</FormLabel>
											<FormControl>
												<Combobox
													variants={Object.keys(PositionStatus)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-col md:flex-row gap-3">
								<FormField
									control={form.control}
									name="entryPrice"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Entry Price</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) => {
														field.onChange({
															target: { value: +e.target.value },
														});
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="exitPrice"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Exit Price</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) => {
														field.onChange({
															target: { value: +e.target.value },
														});
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col md:flex-row gap-3">
								<FormField
									control={form.control}
									name="volume"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Volume</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) => {
														field.onChange({
															target: { value: +e.target.value },
														});
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="profitLoss"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Profit/Loss</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) => {
														field.onChange({
															target: { value: +e.target.value },
														});
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button type="submit" className="w-full">
								<PlusIcon /> Add
							</Button>
						</form>
					</Form>
				</Modal>
			)}
		</div>
	);
};
