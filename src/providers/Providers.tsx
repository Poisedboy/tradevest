'use client';
import 'react-toastify/dist/ReactToastify.css';
import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './theme-providers';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<SessionProvider>
				<ThemeProvider>
					{children}
					<ToastContainer />
				</ThemeProvider>
			</SessionProvider>
		</>
	);
};
