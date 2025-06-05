import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import BarChartIcon from '../icons/BarChartIcon';
import type { Position, Trade, Order } from '../types/global.type';
import Tabs from '../components/Tabs';
import Slider from '../components/Slider';
import InfoIcon from '../icons/InfoIcon';
import { OrderStatus, OrderType, TradeType } from '../types/global.enum';

const Trade = () => {
	const [currentPrice, setCurrentPrice] = useState(0.34);
	const [orderType, setOrderType] = useState<OrderType>(OrderType.MARKET);
	const [side, setSide] = useState<TradeType>(TradeType.BUY_LONG);
	const [orderPrice, setOrderPrice] = useState(0.34);
	const [orderShares, setOrderShares] = useState(0);
	const [percentage, setPercentage] = useState(0);
	const [balance, setBalance] = useState(100);
	const [activeTab, setActiveTab] = useState('OPEN ORDERS');
	const [hideOtherPairs, setHideOtherPairs] = useState(false);

	// Trading data
	const [openOrders, setOpenOrders] = useState<Order[]>([]);
	const [positions, setPositions] = useState<Position[]>([]);
	const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);

	// Price simulation
	const [priceHistory, setPriceHistory] = useState<number[]>([0.34]);
	const [orderBook, setOrderBook] = useState({
		bids: [
			{ price: 0.34, shares: 14984 },
			{ price: 0.335, shares: 14984 },
			{ price: 0.334, shares: 14984 },
			{ price: 0.33, shares: 14984 },
			{ price: 0.32, shares: 14984 },
		],
		asks: [
			{ price: 0.34, shares: 14984 },
			{ price: 0.335, shares: 14984 },
			{ price: 0.334, shares: 14984 },
			{ price: 0.33, shares: 14984 },
			{ price: 0.32, shares: 14984 },
			{ price: 0.31, shares: 14984 },
		],
	});

	// Load data from memory on component mount
	useEffect(() => {
		const savedData = {
			balance: 100,
			openOrders: [],
			positions: [],
			tradeHistory: [],
			hideOtherPairs: false,
		};

		setBalance(savedData.balance);
		setOpenOrders(savedData.openOrders);
		setPositions(savedData.positions);
		setTradeHistory(savedData.tradeHistory);
		setHideOtherPairs(savedData.hideOtherPairs);
	}, []);

	// Save data to memory whenever state changes
	const saveData = useCallback(() => {
		// In a real app, this would use localStorage
		// For this demo, we'll just keep state in memory
	}, [balance, openOrders, positions, tradeHistory, hideOtherPairs]);

	useEffect(() => {
		saveData();
	}, [saveData]);

	// Price simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPrice((prev) => {
				const change = (Math.random() - 0.5) * 0.2;
				const newPrice = Math.max(0.25, Math.min(0.45, prev + change));
				setPriceHistory((hist) => [...hist.slice(-20), newPrice]);
				return Math.round(newPrice * 100) / 100;
			});
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	// Calculate order total
	const orderTotal =
		orderType === OrderType.MARKET
			? currentPrice * orderShares
			: orderPrice * orderShares;
	const potentialWin = orderTotal * 0.85; // Simplified calculation

	// Place order
	const placeOrder = () => {
		if (orderShares <= 0 || orderTotal > balance) return;

		const newOrder: Order = {
			id: Date.now().toString(),
			type: orderType,
			side: side,
			symbol: 'CSK',
			shares: orderShares,
			price: orderType === OrderType.MARKET ? currentPrice : orderPrice,
			timestamp: new Date(),
			status:
				orderType === OrderType.MARKET
					? OrderStatus.FILLED
					: OrderStatus.OPEN,
			market: 'IPL Winner',
		};

		if (orderType === OrderType.MARKET) {
			// Execute immediately
			const newPosition: Position = {
				id: Date.now().toString(),
				symbol: 'CSK',
				side: side,
				shares: orderShares,
				entryPrice: currentPrice,
				currentPrice: currentPrice,
				pnl: 0,
				pnlPercent: 0,
				market: 'IPL Winner',
			};

			const newTrade: Trade = {
				id: Date.now().toString(),
				symbol: 'CSK',
				side: side,
				shares: orderShares,
				price: currentPrice,
				timestamp: new Date(),
				status: OrderStatus.FILLED,
				pnl: 0,
				type: orderType,
				market: 'IPL Winner',
			};

			setPositions((prev) => [...prev, newPosition]);
			setTradeHistory((prev) => [...prev, newTrade]);
			setBalance(
				(prev) =>
					prev - (side === TradeType.BUY_LONG ? orderTotal : -orderTotal),
			);
		} else {
			// Add to open orders
			setOpenOrders((prev) => [...prev, newOrder]);
		}

		// Reset form
		setOrderShares(0);
		setPercentage(0);
		setActiveTab(orderType === OrderType.MARKET ? 'POSITIONS' : 'OPEN ORDERS');
	};

	// Cancel order
	const cancelOrder = (orderId: string) => {
		setOpenOrders((prev) => prev.filter((order) => order.id !== orderId));
	};

	// Close position
	const closePosition = (positionId: string) => {
		const position = positions.find((p) => p.id === positionId);
		if (!position) return;

		const closePrice = currentPrice;
		const pnl =
			position.side === TradeType.BUY_LONG
				? (closePrice - position.entryPrice) * position.shares
				: (position.entryPrice - closePrice) * position.shares;

		setBalance((prev) => prev + pnl + position.entryPrice * position.shares);
		setPositions((prev) => prev.filter((p) => p.id !== positionId));

		const closeOrder: Trade = {
			id: Date.now().toString(),
			type: OrderType.MARKET,
			side:
				position.side === TradeType.BUY_LONG
					? TradeType.SELL_SHORT
					: TradeType.BUY_LONG,
			symbol: position.symbol,
			shares: position.shares,
			price: closePrice,
			timestamp: new Date(),
			status: OrderStatus.FILLED,
			market: position.market,
			pnl: pnl,
		};

		setTradeHistory((prev) => [...prev, closeOrder]);
	};

	// Update positions with current prices
	useEffect(() => {
		setPositions((prev) =>
			prev.map((position) => ({
				...position,
				currentPrice: currentPrice,
				pnl:
					position.side === TradeType.BUY_LONG
						? (currentPrice - position.entryPrice) * position.shares
						: (position.entryPrice - currentPrice) * position.shares,
				pnlPercent:
					position.side === TradeType.BUY_LONG
						? ((currentPrice - position.entryPrice) /
								position.entryPrice) *
						  100
						: ((position.entryPrice - currentPrice) /
								position.entryPrice) *
						  100,
			})),
		);
	}, [currentPrice]);

	return (
		<div className="overflow-auto">
			<div className="flex flex-col gap-4 p-4">
				<div className="flex gap-2 items-center">
					<img
						src="/logos/csk_logo.png"
						alt="logo"
						className="w-12 h-12"
					/>
					<div>
						<p className="text-lg font-bold text-black leading-6">
							Chennai Super Kings
						</p>
						<p className="text-xs text-muted-500">$65.20M</p>
					</div>

					<div className="ml-auto flex items-center gap-2">
						<div className="flex flex-col items-end">
							<p className="text-lg font-bold text-black leading-6">
								<Price price={currentPrice} />
							</p>
							<p className="text-xs text-brand-green-500">+0.84%</p>
						</div>

						<BarChartIcon color="#1E1E1E" size={36} />
					</div>
				</div>
			</div>

			<div className="px-4 pb-4 text-xs leading-4">
				{/* Buy/Sell Toggle */}
				<Tabs
					options={[TradeType.BUY_LONG, TradeType.SELL_SHORT]}
					selected={side}
					onChange={(option) => setSide(option as TradeType)}
				/>

				{/* Order Type */}
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center mt-2 gap-1 w-full p-1 border border-gray-200 rounded-lg bg-neutral-500">
						<InfoIcon color="#1E1E1E" size={20} />
						<select
							className="bg-transparent font-medium flex-1"
							value={orderType}
							onChange={(e) =>
								setOrderType(e.target.value as OrderType)
							}
						>
							<option value={OrderType.MARKET}>Market</option>
							<option value={OrderType.LIMIT}>Limit</option>
						</select>
					</div>
				</div>

				{/* Available Balance */}
				<div className="flex justify-between mb-2 items-center">
					<span className="text-sm text-black cursor-pointer font-semibold tracking-wide underline">
						Available to Trade
					</span>
					<span className="font-medium">
						{balance.toLocaleString()} USDC
					</span>
				</div>

				{/* Price Input */}
				<div className="mb-2">
					<div className="flex items-center bg-neutral-500 border border-neutral-600 px-3 py-2 h-9 rounded-lg">
						<span className="text-black/50 font-semibold mr-3 tracking-wide">
							Price (USD)
						</span>
						<input
							type="number"
							value={
								orderType === OrderType.MARKET
									? currentPrice
									: orderPrice
							}
							onChange={(e) =>
								setOrderPrice(parseFloat(e.target.value))
							}
							disabled={orderType === OrderType.MARKET}
							className="flex-1 bg-transparent text-right font-medium"
							step="0.1"
						/>
						<span className="ml-2">
							{orderType === OrderType.MARKET ? 'Mkt' : ''}
						</span>
					</div>
				</div>

				{/* Shares Input */}
				<div className="mb-2">
					<div className="flex items-center bg-neutral-500 border border-neutral-600 px-3 py-2 h-9 rounded-lg">
						<span className="text-black/50 font-semibold mr-3 tracking-wide">
							Shares
						</span>
						<input
							type="number"
							value={orderShares}
							onChange={(e) =>
								setOrderShares(parseInt(e.target.value) || 0)
							}
							className="flex-1 bg-transparent text-right font-medium"
						/>
					</div>
				</div>

				{/* Percentage Slider */}
				<div className="mb-2">
					<Slider
						value={percentage}
						onChange={(pct: number) => {
							setPercentage(pct);
							const maxShares = Math.floor(
								balance /
									(orderType === OrderType.MARKET
										? currentPrice
										: orderPrice),
							);
							setOrderShares(Math.floor((maxShares * pct) / 100));
						}}
					/>
				</div>

				{/* Order Summary */}
				<div className="space-y-2 mb-4">
					<div className="flex justify-between">
						<span className="text-black font-semibold tracking-wide">
							Order Total
						</span>
						<span className="font-medium">
							<Price price={orderTotal} />
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-black font-semibold tracking-wide">
							To Win 💵
						</span>
						<span className="font-medium">
							<Price price={potentialWin} />
						</span>
					</div>
				</div>

				{/* Place Order Button */}
				<button
					onClick={placeOrder}
					disabled={orderShares <= 0 || orderTotal > balance}
					className={`w-full py-2 rounded font-medium text-white ${
						orderShares > 0 && orderTotal <= balance
							? 'bg-charcoal-500'
							: 'bg-muted-500 cursor-not-allowed'
					}`}
				>
					{side === TradeType.BUY_LONG ? 'BUY/LONG' : 'SELL/SHORT'} CSK
				</button>
			</div>

			{/* Tabs */}
			<div className="tracking-wide">
				<div className="flex border-t border-b border-neutral-600 px-3 gap-3">
					{['OPEN ORDERS', 'POSITIONS', 'TRADE HISTORY'].map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`py-3 px-1 text-xs font-medium ${
								activeTab === tab
									? 'text-black border-b-2 border-black'
									: 'text-black/40'
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Hide Other Pairs */}

				{/* Tab Content */}
				<div className="">
					{activeTab === 'OPEN ORDERS' && (
						<div>
							{openOrders.length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									No open orders
								</p>
							) : (
								<div>
									<div className="px-4 py-2 flex justify-between items-center h-10">
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={hideOtherPairs}
												onChange={(e) =>
													setHideOtherPairs(
														e.target.checked,
													)
												}
												className="w-4 h-4"
											/>
											<span className="text-sm">
												Hide Other Pairs
											</span>
										</label>
										<button className="text-sm text-gray-500 px-3 py-1 border rounded">
											Cancel All
										</button>
									</div>

									{openOrders.map((order: Order) => (
										<div
											key={order.id}
											className="border-t border-neutral-500 p-4"
										>
											<div className="flex justify-between items-start mb-2">
												<div>
													<div className="font-medium">
														{order.symbol}/{' '}
														{order.market}
													</div>
													<div className="text-sm text-gray-500">
														<span className="text-brand-green-600">
															{order.type ==
															OrderType.MARKET
																? 'Mkt'
																: 'Limit'}
															{'/'}
															{order.side ==
															TradeType.BUY_LONG
																? 'Buy'
																: 'Sell'}{' '}
														</span>

														{order.timestamp.toLocaleString()}
													</div>
												</div>
												<button
													onClick={() =>
														cancelOrder(order.id)
													}
													className="text-sm bg-gray-100 px-2 py-1 rounded"
												>
													Cancel
												</button>
											</div>
											<div className="text-sm space-y-1">
												<div className="flex items-center justify-between w-full">
													<span>Amount</span>{' '}
													<span>
														{order.shares} shares
													</span>
												</div>
												<div>
													Price:{' '}
													<Price price={order.price} />
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{activeTab === 'POSITIONS' && (
						<div>
							{positions.length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									No open positions
								</p>
							) : (
								<div>
									<div className="px-4 py-2 flex justify-between items-center h-10">
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={hideOtherPairs}
												onChange={(e) =>
													setHideOtherPairs(
														e.target.checked,
													)
												}
												className="w-4 h-4"
											/>
											<span className="text-sm">
												Hide Other Pairs
											</span>
										</label>
										<button className="text-sm text-gray-500 px-3 py-1 border rounded">
											Close All
										</button>
									</div>
									{positions.map((position: Position) => (
										<div
											key={position.id}
											className="border-t border-neutral-500 p-4"
										>
											<div className="flex justify-between items-start mb-2">
												<div>
													<div className="font-medium">
														{position.symbol} /{' '}
														{position.market}
													</div>
													<div className="text-sm text-gray-500">
														{position.side ==
														TradeType.BUY_LONG
															? 'Buy'
															: 'Sell'}{' '}
														{position.shares} shares
													</div>
												</div>
												<button
													onClick={() =>
														closePosition(position.id)
													}
													className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded"
												>
													Close
												</button>
											</div>
											<div className="text-sm space-y-1">
												<div>
													Entry:{' '}
													<Price
														price={position.entryPrice}
													/>
												</div>
												<div>
													Current:{' '}
													<Price
														price={position.currentPrice}
													/>
												</div>
												<div
													className={`font-medium ${
														position.pnl >= 0
															? 'text-green-600'
															: 'text-red-600'
													}`}
												>
													P&L:{' '}
													<Price price={position.pnl} /> (
													{position.pnlPercent.toFixed(2)}
													%)
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{activeTab === 'TRADE HISTORY' && (
						<div>
							{tradeHistory.length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									No trade history
								</p>
							) : (
								<div>
									<div className="px-4 py-2 flex justify-between items-center h-10">
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={hideOtherPairs}
												onChange={(e) =>
													setHideOtherPairs(
														e.target.checked,
													)
												}
												className="w-4 h-4"
											/>
											<span className="text-sm">
												Hide Other Pairs
											</span>
										</label>
									</div>
									{tradeHistory
										.slice()
										.reverse()
										.map((trade: Trade) => (
											<div
												key={trade.id}
												className="border-t border-neutral-500 p-4"
											>
												<div className="flex justify-between items-start mb-2">
													<div>
														<div className="font-medium">
															{trade.symbol} /{' '}
															{trade.market}
														</div>
														<div className="text-sm text-gray-500">
															{trade.type} /{' '}
															{trade.side ==
															TradeType.BUY_LONG
																? 'Buy'
																: 'Sell'}{' '}
															{trade.timestamp.toLocaleString()}
														</div>
													</div>
													<span
														className={`text-xs px-2 py-1 rounded ${
															trade.status ===
															OrderStatus.FILLED
																? 'bg-green-100 text-green-600'
																: 'bg-gray-100 text-gray-600'
														}`}
													>
														{trade.status ==
														OrderStatus.FILLED
															? 'Filled'
															: 'Open'}
													</span>
												</div>
												<div className="text-sm space-y-1">
													<div>
														Amount: {trade.shares} shares
													</div>
													<div>
														Price:{' '}
														<Price price={trade.price} />
													</div>
													{trade.pnl !== undefined && (
														<div
															className={`font-medium ${
																trade.pnl >= 0
																	? 'text-green-600'
																	: 'text-red-600'
															}`}
														>
															P&L:{' '}
															<Price
																price={trade.pnl}
															/>
														</div>
													)}
												</div>
											</div>
										))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Order Book (Right Side Panel) */}
			<div className="fixed right-0 top-0 w-64 h-full bg-white border-l overflow-y-auto hidden lg:block">
				<div className="p-4">
					<h3 className="font-medium mb-4">Order Book</h3>
					<div className="space-y-1">
						<div className="flex justify-between text-xs text-gray-500 mb-2">
							<span>Price</span>
							<span>Shares (CSK)</span>
						</div>

						{/* Asks */}
						{orderBook.asks
							.slice()
							.reverse()
							.map((ask, idx) => (
								<div
									key={idx}
									className="flex justify-between text-sm text-red-600"
								>
									<span>
										<Price price={ask.price} />
									</span>
									<span>{ask.shares.toLocaleString()}</span>
								</div>
							))}

						{/* Current Price */}
						<div className="flex justify-between font-medium py-2 border-y">
							<span>
								<Price price={currentPrice} />
							</span>
							<span>(Spread 1%)</span>
						</div>

						{/* Bids */}
						{orderBook.bids.map((bid, idx) => (
							<div
								key={idx}
								className="flex justify-between text-sm text-green-600"
							>
								<span>
									<Price price={bid.price} />
								</span>
								<span>{bid.shares.toLocaleString()}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Trade;

const Price = ({ price }: { price: number }) => {
	if (Math.abs(price) < 1) {
		return <span>{(price * 100).toFixed(0)}¢</span>;
	} else {
		return <span>${price.toFixed(2)}</span>;
	}
};
