import { memo } from 'react';
import { OrderBook as OrderBookType } from '../types/global.type';
import Price from './Price';
import { calculateSpreadPercent } from '../utility';

const OrderBook = memo(
	({
		orderBook,
		shareName,
		price,
	}: {
		orderBook: OrderBookType;
		shareName: string;
		price: number;
	}) => {
		const allOrders = [...orderBook.bids, ...orderBook.asks];
		const maxShares = Math.max(...allOrders.map((o) => o.shares));
		const getBarWidth = (shares: number) => `${(shares / maxShares) * 100}%`;
		const spreadPercent = calculateSpreadPercent(orderBook);

		return (
			<div className="w-1/3 overflow-y-auto pr-4">
				<div className="flex flex-col gap-1">
					<div className="flex justify-between text-xs text-black/70 font-medium mb-2">
						<span>Price</span>
						<span>Shares ({shareName})</span>
					</div>

					{/* Asks */}
					{orderBook.asks
						.slice()
						.reverse()
						.map((ask, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between text-xs text-black/60 h-[22px] relative"
							>
								<div
									className="h-full bg-[#A90022]/10 absolute left-0"
									style={{ width: getBarWidth(ask.shares) }}
								/>
								<span>
									<Price price={ask.price} />
								</span>
								<span>{ask.shares?.toFixed(2)}</span>
							</div>
						))}

					{/* Current Price */}
					<div className="flex items-center justify-between font-medium text-black h-[22px]">
						<span className="text-sm">
							<Price price={price} />
						</span>
						<span
							className="whitespace-nowrap text-right"
							style={{ fontSize: '10px' }}
						>
							{`Spread ${spreadPercent}%`}
						</span>
					</div>

					{/* Bids */}
					{orderBook.bids.map((bid, idx) => (
						<div
							key={idx}
							className="flex items-center justify-between text-xs text-black/60 h-[22px] relative"
						>
							<div
								className="h-full bg-[#00A900]/10 absolute left-0"
								style={{ width: getBarWidth(bid.shares) }}
							/>
							<span>
								<Price price={bid.price} />
							</span>
							<span>{bid.shares?.toFixed(2)}</span>
						</div>
					))}
				</div>
			</div>
		);
	},
);

export default OrderBook;
