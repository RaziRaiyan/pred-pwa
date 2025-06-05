import { OrderStatus, OrderType, TradeType } from './global.enum';

export type Position = {
	id: string;
	symbol: string;
	side: TradeType;
	shares: number;
	entryPrice: number;
	currentPrice: number;
	pnl: number;
	pnlPercent: number;
	marketId: number;
	marketShortTitle: string;
	marketEventTitle: string;
};

export type Order = {
	id: string;
	symbol: string;
	side: TradeType;
	shares: number;
	price: number;
	timestamp: Date;
	type: OrderType;
	status: OrderStatus;
	marketId: number;
	marketShortTitle: string;
	marketEventTitle: string;
};

export type Trade = {
	id: string;
	symbol: string;
	type: OrderType;
	side: TradeType;
	shares: number;
	price: number;
	timestamp: Date;
	status: OrderStatus;
	pnl: number;
	marketId: number;
	marketShortTitle: string;
	marketEventTitle: string;
};

export type OrderBook = {
	bids: { price: number; shares: number }[];
	asks: { price: number; shares: number }[];
};

export type Market = {
	id: number;
	title: string;
	shortTitle: string;
	logo: string;
	volume: number;
	price: number;
	change: number;
	eventTitle: string;
	eventStartDate: string;
	eventEndDate: string;
	orderBook: OrderBook;
};
