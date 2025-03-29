'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { HomeIcon, SettingsIcon, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const links = [
	{ name: 'Home', href: '/dashboard', icon: <HomeIcon /> },
	{ name: 'Settings', href: '/settings', icon: <SettingsIcon /> },
	{ name: 'Cart', href: '/cart', icon: <ShoppingCart /> },
];

export const NavigationBar = () => {
	const [search, setSearch] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

	return (
		<div className="flex h-[80px] w-full justify-between px-3 py-3.5 sm:px-6">
			<div className="flex items-center gap-5">
				<div
					className="z-50 md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? (
						<div className="flex flex-col items-center justify-center gap-1">
							<div className="h-1 w-6 translate-y-1 rotate-45 rounded-full bg-black dark:bg-white"></div>
							<div className="h-1 w-6 -translate-y-1 -rotate-45 rounded-full bg-black dark:bg-white"></div>
						</div>
					) : (
						<div className="flex flex-col gap-1">
							<div className="h-1 w-6 rounded-full bg-black dark:bg-white"></div>
							<div className="h-1 w-6 rounded-full bg-black dark:bg-white"></div>
							<div className="h-1 w-6 rounded-full bg-black dark:bg-white"></div>
						</div>
					)}
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => {
							setIsMenuOpen(false);
							router.push('/dashboard');
						}}
						variant={'ghost'}
						size={'lg'}
					>
						<h1 className="text-[18px] leading-[104%] font-medium flex">
							TradeVest
						</h1>
					</Button>
				</div>
			</div>
			<div className="hidden items-center gap-2 md:flex">
				<Input value={search} onChange={(e) => setSearch(e.target.value)} />
				{links.map((link, index) => (
					<LinkIcon {...link} key={index} />
				))}
				<ModeToggle />
			</div>
			<div className="flex items-center gap-2">
				<Button variant={'secondary'} onClick={() => signOut()}>
					Log out
				</Button>
			</div>
			{/* Sidebar Menu */}
			<div
				className={` fixed top-[80px] left-0 h-full w-full bg-background transition-opacity duration-300 md:hidden ${
					isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
				}`}
			>
				<div
					className={`fixed top-[80px] left-0 h-full w-full transform shadow-lg transition-transform duration-300 ${
						isMenuOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className="w-full space-y-4 p-6">
						<Input value={search} onChange={(e) => setSearch(e.target.value)} />
						<div
							className="flex w-full justify-between gap-4"
							onClick={() => setIsMenuOpen(false)}
						>
							{links.map((link, index) => (
								<LinkIcon {...link} key={index} />
							))}
							<ModeToggle />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

function LinkIcon({
	href,
	icon,
}: {
	name?: string;
	href: string;
	icon: React.ReactNode;
}) {
	const router = useRouter();
	return (
		<Button onClick={() => router.push(href)} variant={'outline'} size={'icon'}>
			{icon}
		</Button>
	);
}
