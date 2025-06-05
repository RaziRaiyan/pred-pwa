import './App.css';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Markets from './pages/Markets';
import Trade from './pages/Trade';
import Wallet from './pages/Wallet';
import Menu from './pages/Menu';

import { Toaster } from 'react-hot-toast';
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
	Link,
	Navigate,
} from 'react-router';
import { useEffect } from 'react';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			errorElement: (
				<div className="flex flex-col h-full items-center justify-center">
					<h1 className="text-xl font-bold p-4 text-center">
						404 Page Not Found!
					</h1>
					<p className="text-muted-500">
						The page you are looking for does not exist.
					</p>
					<Link to="/markets">Go to Home</Link>
				</div>
			),
			element: (
				<>
					<div
						className="flex flex-col h-full"
						style={{
							overflowY: 'auto',
							maxHeight: 'calc(var(--vh, 1vh) * 100 - 125px)',
						}}
					>
						<Outlet />
					</div>
					<BottomNav />
				</>
			),
			children: [
				{
					path: '/',
					element: <Navigate to="/markets" replace />,
				},
				{
					path: '/markets',
					element: <Markets />,
				},
				{
					path: '/trades/:marketId',
					element: <Trade />,
				},
				{
					path: '/wallet',
					element: <Wallet />,
				},
				{
					path: '/menu',
					element: <Menu />,
				},
			],
		},
	]);

	useEffect(() => {
		// Fix for iOS Safari viewport height
		const setViewportHeight = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		setViewportHeight();
		window.addEventListener('resize', setViewportHeight);
		window.addEventListener('orientationchange', setViewportHeight);

		return () => {
			window.removeEventListener('resize', setViewportHeight);
			window.removeEventListener('orientationchange', setViewportHeight);
		};
	}, []);

	return (
		<div
			className="flex flex-col h-full md:border-x md:border-gray-200"
			style={{ height: '100dvh', minHeight: 'calc(var(--vh, 1vh) * 100)' }}
		>
			<Header />
			<RouterProvider router={router} />
			<Toaster position="bottom-center" />
		</div>
	);
};

export default App;
