import 'react-toastify/dist/ReactToastify.css';
import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './theme-providers';

export const Providers = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<ThemeProvider>
				{children}
				<ToastContainer />
			</ThemeProvider>
		</>
	);
};
