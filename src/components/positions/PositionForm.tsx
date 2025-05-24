'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Modal } from '../Modal';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Combobox } from '../Combobox';
import { Balance, Market, PositionStatus, PositionType } from '@prisma/client';
import { PositionFormType, positionSchema } from '@/types/forms.types';
import { createPosition } from '@/actions/createPosition';
import { useNotification } from '@/hooks/useNotification';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { DateTimePicker } from '../DateTimePicker';
import { useSession } from 'next-auth/react';

export const PositionForm = () => {
	const { successToast, errorToast } = useNotification();
	const [isOpen, setIsOpen] = useState(false);
	const { data } = useSession();

	const form = useForm({
		resolver: zodResolver(positionSchema),
		defaultValues: {
			market: Market.FOREX,
			pair: '',
			entryPrice: '',
			entryTime: new Date(),
			volume: '',
			profit: '0',
			positionType: PositionType.LONG,
			status: PositionStatus.OPEN,
		},
	});

	async function onSubmit(values: PositionFormType) {
		try {
			const { message, ok } = await createPosition(values);
			if (ok) {
				form.reset();
				setIsOpen(false);
				successToast(message);
			} else {
				errorToast(message);
			}
		} catch (error) {
			errorToast('Something went wrong');
			console.error(error);
		}
	}
	const isOpenStatus = form.watch('status') !== PositionStatus.OPEN;

	return (
		<div>
			<Button
				variant={'outline'}
				size={'icon'}
				className="rounded-lg"
				onClick={() => setIsOpen(true)}
			>
				<PlusIcon size={24} />
			</Button>
			{isOpen && (
				<Modal
					open={isOpen}
					setIsOpen={setIsOpen}
					title="Add Position"
					className=""
				>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
							<div className="flex gap-3">
								<FormField
									control={form.control}
									name="market"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Market</FormLabel>
											<FormControl>
												<Combobox
													variants={
														data?.user.balance.map(
															(balance: Balance) => balance.market,
														) || []
													}
													{...field}
												/>
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
							<div className="flex gap-3">
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

							<div className="flex gap-3">
								<FormField
									control={form.control}
									name="volume"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Volume</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) => {
														const value = e.target.value;
														if (/^\d*\.?\d*$/.test(value)) {
															field.onChange(value);
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{isOpenStatus && (
									<FormField
										control={form.control}
										name="profit"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Profit</FormLabel>
												<FormControl>
													<Input
														{...field}
														onChange={(e) => {
															const value = e.target.value;
															if (/^\d*\.?\d*$/.test(value)) {
																field.onChange(value);
															}
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</div>

							<div className="flex gap-3">
								<FormField
									control={form.control}
									name="entryPrice"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Entry Price</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) => {
														const value = e.target.value;
														if (/^\d*\.?\d*$/.test(value)) {
															field.onChange(value);
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{isOpenStatus && (
									<FormField
										control={form.control}
										name="exitPrice"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Exit Price</FormLabel>
												<FormControl>
													<Input
														{...field}
														onChange={(e) => {
															const value = e.target.value;
															if (/^\d*\.?\d*$/.test(value)) {
																field.onChange(value);
															}
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</div>

							<div className="flex gap-3">
								<FormField
									control={form.control}
									name="entryTime"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Entry Time</FormLabel>
											<FormControl>
												<DateTimePicker
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{isOpenStatus && (
									<FormField
										control={form.control}
										name="exitTime"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Exit Time</FormLabel>
												<FormControl>
													<DateTimePicker
														value={field.value}
														onChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</div>
							<Button type="submit" className="w-full">
								<PlusIcon /> Add
							</Button>
							<Button
								type="button"
								className="w-full"
								variant={'destructive'}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</Button>
						</form>
					</Form>
				</Modal>
			)}
		</div>
	);
};
