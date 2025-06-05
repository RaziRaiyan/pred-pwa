import { useState } from 'react';
import './App.css';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Markets from './pages/Markets';
import Trade from './pages/Trade';
import Assets from './pages/Assets';
import Menu from './pages/Menu';
import { PAGES } from './types/pages.enum';

const App = () => {
	const [currentPage, setCurrentPage] = useState<PAGES>(PAGES.MARKETS);

	return (
		<div className="flex flex-col h-full">
			<Header />
			<div className="flex flex-col h-full">
				{currentPage === PAGES.MARKETS && <Markets />}
				{currentPage === PAGES.TRADES && <Trade />}
				{currentPage === PAGES.ASSETS && <Assets />}
				{currentPage === PAGES.MENU && <Menu />}
			</div>
			<BottomNav
				selected={currentPage}
				setSelected={(page) => setCurrentPage(page as PAGES)}
			/>
		</div>
	);
};

export default App;
