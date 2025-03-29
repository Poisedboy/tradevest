import { GoBackButton } from '@/components/buttons/GoBackButton';
import Image from 'next/image';

export default function NotFound() {
	return (
		<div className="h-screen flex flex-col gap-5 justify-center items-center">
			<Image src="/window.svg" width={100} height={100} alt="404" />
			<h1>Page Not Found!</h1>
			<p>Sorry, the page you are looking for does not exist.</p>
			<GoBackButton className="text-blue-700" />
		</div>
	);
}
