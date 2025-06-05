import React, { useEffect, useRef } from 'react';
import './Style.css';

type SliderProps = {
	value: number;
	onChange: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const gradient = `linear-gradient(
       to right,
       #000000 0%,
       #000000 ${value}%,
       #d1d5db ${value}%,
       #d1d5db 100%
     )`;
		if (ref.current) {
			ref.current.style.setProperty('--slider-gradient', gradient);
		}
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(Number(e.target.value));
	};

	return (
		<div className="flex items-center gap-3">
			<input
				type="range"
				min="0"
				max="100"
				value={value}
				onChange={handleChange}
				className="flex-1 slider"
				style={{ height: '2px' }}
				ref={ref}
			/>

			{/* Display the current percentage */}
			<span className="font-medium">{value}%</span>
		</div>
	);
};

export default Slider;
