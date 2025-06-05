import { PAGES } from '../types/pages.enum';
import type { BottomNavType } from '../types/bottomnav.type';

export const BOTTOM_NAV_ITEMS: BottomNavType = [
	{
		label: 'Markets',
		id: PAGES.MARKETS,
		icon: '/icons/markets_icon.svg',
	},
	{
		label: 'Trade',
		id: PAGES.TRADES,
		icon: '/icons/trade_icon.svg',
	},
	{
		label: 'Wallet',
		id: PAGES.WALLET,
		icon: '/icons/wallet_icon.svg',
	},
	{
		label: 'More',
		id: PAGES.MENU,
		icon: '/icons/menu_icon.svg',
	},
];
