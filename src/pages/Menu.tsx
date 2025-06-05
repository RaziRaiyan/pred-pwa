import { defaultState } from '../configs';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TradeState } from '../types/global.type';

const Menu = () => {
	const { setValue } = useLocalStorage<TradeState>('trade', defaultState);

	const handleResetState = () => {
		setValue(defaultState);
		window.location.reload();
	};

	return (
		<div className="flex flex-col gap-4 justify-center items-center h-full">
			<button
				className="bg-neutral-500 p-4 rounded-lg"
				onClick={handleResetState}
			>
				Reset State
			</button>
		</div>
	);
};

export default Menu;
