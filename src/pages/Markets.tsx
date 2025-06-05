import { marketData } from '../configs/dummy_data';
import BarChartIcon from '../icons/BarChartIcon';
import Price from '../components/Price';
import { convertToKMB, formatPrice, calculateSpreadPercent } from '../utility';
import type { Market } from '../types/global.type';
import { memo, useEffect } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const Markets = () => {
	return (
		<div className="flex flex-col divide-y divide-neutral-600">
			{marketData.map((market) => (
				<MarketCard key={market.id} market={market} />
			))}
		</div>
	);
};

export default Markets;

const MarketCard = memo(({ market }: { market: Market }) => {
	const navigate = useNavigate();

	return (
		<div
			className="flex gap-2 items-center p-4"
			key={market.id}
			onClick={() => {
				navigate(`/trades/${market.id}`);
			}}
		>
			<div className="flex items-center h-12 w-12">
				<img src={market.logo} alt="logo" className="h-12" />
			</div>
			<div>
				<p className="text-lg font-bold text-black leading-6">
					{market.shortTitle} / {market.eventTitle}
				</p>
				<p className="text-xs text-muted-500">
					${convertToKMB(market.volume)} | Spread:{' '}
					{formatPrice(market.orderBook.asks[0].price)} -{' '}
					{formatPrice(market.orderBook.bids[0].price)}
					<span className="text-xs text-muted-500 ml-1">
						({calculateSpreadPercent(market.orderBook)}
						%)
					</span>
				</p>
			</div>

			<div className="ml-auto flex items-center gap-2">
				<div className="flex flex-col items-end">
					<p className="text-lg font-bold text-black leading-6">
						<FluctuatePrice price={market.price} />
					</p>
					<p
						className={clsx(
							'text-xs',
							market.change > 0
								? 'text-brand-green-500'
								: 'text-red-600',
						)}
					>
						${market.change}%
					</p>
				</div>

				<BarChartIcon color="#1E1E1E" size={36} />
			</div>
		</div>
	);
});

const FluctuatePrice = ({ price }: { price: number }) => {
	const [currentPrice, setCurrentPrice] = useState(price);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPrice((prev) => {
				const change = (Math.random() - 0.5) * 0.2;
				const newPrice = Math.max(0.25, Math.min(0.45, prev + change));
				return Math.round(newPrice * 100) / 100;
			});
		}, 2000);

		return () => clearInterval(interval);
	}, [price]);

	return <Price price={currentPrice} />;
};
