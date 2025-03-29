import { NavigationBar } from '@/components/Navbar';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<NavigationBar />
			</header>
			<main className="flex-1 p-4">{children}</main>
		</div>
	);
}
