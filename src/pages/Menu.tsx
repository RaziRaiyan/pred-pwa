import { defaultState } from '../configs';

const Menu = () => {
	const handleResetState = () => {
		localStorage.setItem('trade', JSON.stringify(defaultState));
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
