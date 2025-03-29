'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const GoBackButton = ({ className }: { className: string }) => {
	const router = useRouter();
	return (
		<Button
			variant={'link'}
			className={cn(className)}
			onClick={() => router.back()}
		>
			Go Back
		</Button>
	);
};
