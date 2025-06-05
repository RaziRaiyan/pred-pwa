const BarChartIcon: React.FC<{ color: string; size?: number }> = ({
	color = '#1E1E1E',
	size = 24,
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M27 30V15M18 30V6M9 30V21"
				stroke={color}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default BarChartIcon;
