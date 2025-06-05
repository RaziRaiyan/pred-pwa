import { formatPrice } from '../utility';
import { defaultState } from '../configs';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TradeState } from '../types/global.type';

const Wallet = () => {
	const { getValue: getTradeData, setValue: setTradeData } =
		useLocalStorage<TradeState>('trade', defaultState);

	const handleResetState = () => {
		setTradeData(defaultState);
		window.location.reload();
	};

	const totalBalance = getTradeData().balance ?? 0;

	return (
		<div className="flex flex-col gap-4 justify-center items-center h-full">
			<div className="flex flex-col gap-2 justify-center items-center">
				<p className="text-sm text-muted-500">Total Balance</p>
				<h1 className="text-2xl font-bold">{formatPrice(totalBalance)}</h1>
			</div>

			<div className="">
				<button
					className="bg-neutral-500 px-4 py-2 rounded-lg"
					onClick={handleResetState}
				>
					Reset State
				</button>
			</div>
		</div>
	);
};

export default Wallet;
