import './App.css';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Markets from './pages/Markets';
import Trade from './pages/Trade';
import Wallet from './pages/Wallet';
import Menu from './pages/Menu';

import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, Outlet, RouterProvider, Link } from 'react-router';

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
							maxHeight: 'calc(100vh - 135px)',
						}}
					>
						<Outlet />
					</div>
					<BottomNav />
				</>
			),
			children: [
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

	return (
		<div className="flex flex-col h-full">
			<Header />
			<RouterProvider router={router} />
			<Toaster position="bottom-center" />
		</div>
	);
};

export default App;
