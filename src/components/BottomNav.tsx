import { BOTTOM_NAV_ITEMS } from '../configs';
import MarketIcon from '../icons/MarketIcon';
import TradeIcon from '../icons/TradeIcon';
import WalletIcon from '../icons/WalletIcon';
import MenuIcon from '../icons/MenuIcon';
import { PAGES } from '../types/pages.enum';
import { clsx } from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const PageIconMap: Record<PAGES, React.FC<{ color: string; size?: number }>> = {
	[PAGES.MARKETS]: MarketIcon,
	[PAGES.TRADES]: TradeIcon,
	[PAGES.WALLET]: WalletIcon,
	[PAGES.MENU]: MenuIcon,
};

const BottomNav = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const selected = pathname.split('/')[1] as PAGES;

	const { getValue } = useLocalStorage<{ lastMarketSelected: string }>(
		'lastMarketSelected',
		{
			lastMarketSelected: '1',
		},
	);

	const handleNavClick = (page: PAGES) => {
		if (page === PAGES.TRADES) {
			const lastMarketSelected = getValue().lastMarketSelected;

			if (lastMarketSelected) {
				navigate(`/trades/${lastMarketSelected || 1}`);
			}
		} else {
			navigate(page);
		}
	};

	return (
		<div className="flex justify-between items-center border-t border-gray-200">
			{BOTTOM_NAV_ITEMS.map((item) => (
				<div
					className="flex flex-col items-center cursor-pointer p-4 flex-1"
					onClick={() => {
						handleNavClick(item.id);
					}}
					key={item.id}
				>
					<NavIcon page={item.id} selected={selected === item.id} />

					<div
						className={clsx(
							'text-sm font-medium',
							selected == item.id ? 'text-black' : 'text-muted-500',
						)}
					>
						{item.label}
					</div>
				</div>
			))}
		</div>
	);
};

export default BottomNav;

const NavIcon: React.FC<{
	page: PAGES;
	selected: boolean;
}> = ({ page, selected }) => {
	const Icon = PageIconMap[page];

	return <Icon color={selected ? '#000000' : '#858585'} />;
};
