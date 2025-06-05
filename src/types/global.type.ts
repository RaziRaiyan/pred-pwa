import { OrderStatus, OrderType, TradeType } from './global.enum';

export type Position = {
	id: string;
	symbol: string;
	market: string;
	side: TradeType;
	shares: number;
	entryPrice: number;
	currentPrice: number;
	pnl: number;
	pnlPercent: number;
};

export type Order = {
	id: string;
	symbol: string;
	market: string;
	side: TradeType;
	shares: number;
	price: number;
	timestamp: Date;
	type: OrderType;
	status: OrderStatus;
};

export type Trade = {
	id: string;
	symbol: string;
	market: string;
	type: OrderType;
	side: TradeType;
	shares: number;
	price: number;
	timestamp: Date;
	status: OrderStatus;
	pnl: number;
};
