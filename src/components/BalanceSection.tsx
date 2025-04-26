'use client';

import { Market } from '@prisma/client';
import { Button } from './ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Input } from './ui/input';
import { createBalance } from '@/actions/createBalance';

const marketSchema = z.object({
	market: z.string().min(1, { message: 'Market is required' }),
	balance: z.number().min(0, { message: 'Balance must be a positive number' }),
});

type BalanceType = {
	balance: number;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	market: Market;
};

export const BalanceSection = ({ balances }: { balances: BalanceType[] }) => {
	const [loding, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(marketSchema),
		defaultValues: {
			market: '',
			balance: 0,
		},
	});
	async function onSubmit(values: z.infer<typeof marketSchema>) {
		setLoading(true);
		try {
			const res = await createBalance({
				balance: values.balance,
				market: values.market as Market,
			});
			if (res.ok) {
				alert('Balance added successfully');
				setOpen(false);
			} else {
				alert(res.message);
			}
		} catch (error) {
			console.error('Error adding balance:', error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className="space-y-3">
			<h2 className="subtitle">Balance</h2>
			<div className="w-full flex gap-3">
				{balances.map((balance) => (
					<span
						key={balance.id}
						className="flex gap-2 px-6 py-1 items-center border rounded-md"
					>
						<p>{balance.market}</p>
						<p>{String(balance.balance)}</p>
					</span>
				))}
				<Button variant="ghost" onClick={() => setOpen(true)} disabled={loding}>
					+ Add
				</Button>
			</div>
			{open && (
				<Form {...form}>
					<form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="market"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Market</FormLabel>
									<FormControl>
										<Input placeholder="Select market" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="balance"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Balance</FormLabel>
									<FormControl>
										<Input type="numebr" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full" disabled={loding}>
							{loding ? 'Loading...' : 'Save Balance'}
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
};
