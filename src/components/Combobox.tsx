'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

type ComboboxProps = {
	variants: string[];
	value: string;
	onChange: (value: string) => void;
};

export const Combobox: React.FC<ComboboxProps> = ({
	variants,
	value,
	onChange,
}) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? variants.find((framework) => framework === value)
						: 'Select...'}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit p-0">
				<Command>
					<CommandList>
						<CommandEmpty>No value chosen</CommandEmpty>
						<CommandGroup>
							{variants.map((variant) => (
								<CommandItem
									key={variant}
									value={variant}
									onSelect={(currentValue) => {
										if (currentValue !== value) {
											onChange(currentValue);
											setOpen(false);
										}
									}}
								>
									{variant}
									<Check
										className={cn(
											'ml-auto',
											value === variant ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
