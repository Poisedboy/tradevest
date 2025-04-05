'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

type ModalProps = {
	children: React.ReactNode;
	open: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
	className?: string;
};

export const Modal: React.FC<ModalProps> = ({
	children,
	className,
	open,
	title,
	setIsOpen,
}) => {
	return (
		<Dialog open={open} onOpenChange={() => setIsOpen(!open)}>
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
