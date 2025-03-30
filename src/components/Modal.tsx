'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type ModalProps = {
	children: React.ReactNode;
	open: boolean;
	title: string;
	className?: string;
};

export const Modal: React.FC<ModalProps> = ({
	children,
	className,
	open,
	title,
}) => {
	return (
		<Dialog open={open}>
			<DialogContent className={cn(className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<div>{children}</div>
					<DialogDescription></DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
