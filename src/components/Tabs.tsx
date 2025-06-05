type TabsProps = {
	options: string[];
	selected: string;
	onChange: (option: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ options, selected, onChange }) => {
	return (
		<div className="flex bg-neutral-500 border border-neutral-600 rounded-lg  p-[2px]">
			{options.map((option) => (
				<button
					key={option}
					onClick={() => onChange(option)}
					className={`flex-1 py-2 px-1 font-medium text-xs rounded-xs ${
						selected === option
							? 'bg-charcoal-500 text-white'
							: 'bg-white/0 text-gray-600'
					}`}
				>
					{option}
				</button>
			))}
		</div>
	);
};

export default Tabs;
