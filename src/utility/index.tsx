import type { OrderBook } from '../types/global.type';

export const convertToKMB = (num: number) => {
	if (num < 1000) {
		return num.toFixed(4);
	}
	if (num < 1000000) {
		return `${(num / 1000).toFixed(2)}K`;
	}
	if (num < 1000000000) {
		return `${(num / 1000000).toFixed(2)}M`;
	}
	return `${(num / 1000000000).toFixed(2)}B`;
};

export const formatPrice = (price: number) => {
	if (price === 0) {
		return '$0.00';
	} else if (Math.abs(price) < 1) {
		return `${(price * 100).toFixed(0)}¢`;
	} else {
		return `$${price.toFixed(2)}`;
	}
};

export const calculateSpreadPercent = (orderBook: OrderBook) => {
	if (!orderBook?.bids?.length || !orderBook?.asks?.length) return null;

	const bestBid = orderBook.bids[0].price; // highest bid
	const bestAsk = orderBook.asks[0].price; // lowest ask

	const spread = bestAsk - bestBid;
	const spreadPercent = (spread / bestAsk) * 100;

	return spreadPercent.toFixed(2); // e.g., "1.45"
};

export const formatDateTime = (date: string) => {
	const pad = (n: number) => n.toString().padStart(2, '0');

	const dateObj = new Date(date);

	const year = dateObj.getFullYear();
	const month = pad(dateObj.getMonth() + 1); // months are 0-based
	const day = pad(dateObj.getDate());

	const hours = pad(dateObj.getHours());
	const minutes = pad(dateObj.getMinutes());
	const seconds = pad(dateObj.getSeconds());

	return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
};
