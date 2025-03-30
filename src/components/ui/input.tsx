import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.ComponentProps<'input'> {
	isPassword?: boolean;
	showPassword?: boolean;
	setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Input({ className, isPassword, type, ...props }: InputProps) {
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	return (
		<div className="relative">
			<input
				type={!isPassword ? type : showPassword ? 'text' : 'password'}
				data-slot="input"
				className={cn(
					'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					type === 'number' && 'w-[110px]',
					className,
				)}
				{...props}
			/>
			{isPassword && (
				<button
					type="button"
					onClick={() => setShowPassword?.((prev) => !prev)}
					className="absolute inset-y-0 right-2 flex items-center px-2 text-muted-foreground focus:outline-none"
				>
					{showPassword ? (
						<EyeOff className="h-4 w-4" />
					) : (
						<Eye className="h-4 w-4" />
					)}
				</button>
			)}
		</div>
	);
}

export { Input };
