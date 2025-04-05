'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DateTimePicker({
	value,
	onChange,
}: {
	value: Date | null;
	onChange: (date: Date | null) => void;
}) {
	return (
		<DatePicker
			selected={value}
			onChange={onChange}
			showTimeSelect
			timeFormat="HH:mm"
			timeIntervals={1}
			dateFormat="Pp"
			className="w-full rounded-md border border-input bg-background  px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
			placeholderText="Select date and time"
		/>
	);
}
