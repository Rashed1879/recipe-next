import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Recipe App',
	description: 'simple crud application for manage recipes',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
