import { PAGES } from '../types/pages.enum';
import type { BottomNavType } from '../types/bottomnav.type';
import type { TradeState } from '../types/global.type';

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

export const defaultState: TradeState = {
	balance: 100,
	positions: [],
	openOrders: [],
	tradeHistory: [],
};
