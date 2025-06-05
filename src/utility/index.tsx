import type { OrderBook } from '../types/global.type';

export const convertToKMB = (num: number) => {
	if (num < 1000) {
		return num;
	}
	if (num < 1000000) {
		return `${(num / 1000).toFixed(1)}K`;
	}
	if (num < 1000000000) {
		return `${(num / 1000000).toFixed(1)}M`;
	}
	return `${(num / 1000000000).toFixed(1)}B`;
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
