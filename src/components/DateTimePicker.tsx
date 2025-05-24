'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

export function DateTimePicker({
	value,
	onChange,
}: {
	value?: Date;
	onChange: (date: Date | null) => void;
}) {
	return (
		<DatePicker
			wrapperClassName="w-full"
			calendarClassName="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white rounded-lg shadow-lg"
			dayClassName={() =>
				'bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
			}
			popperClassName="z-50 dark:bg-zinc-900"
			selected={value}
			onChange={onChange}
			showTimeSelect
			timeFormat="HH:mm"
			timeIntervals={1}
			dateFormat="Pp"
			className="w-full rounded-md border border-input dark:bg-input/30 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
			placeholderText="Select date and time"
		/>
	);
}
