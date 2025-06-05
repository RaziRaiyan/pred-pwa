import BellIcon from '../icons/BellIcon';
import StarIcon from '../icons/StarIcon';

const Header = () => {
	return (
		<div className="flex justify-between items-center p-4 border-b border-gray-200">
			<div className="flex items-center gap-2">
				<img src="/logos/logo_small.png" alt="logo" className="w-6 h-6" />
			</div>
			<div className="flex items-center gap-4">
				<StarIcon color="#1E1E1E" size={24} />
				<BellIcon color="#1E1E1E" size={24} />
			</div>
		</div>
	);
};

export default Header;
