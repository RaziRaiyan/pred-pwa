const Progress = ({ progress }: { progress: number }) => {
	return (
		<div className="w-full h-2 bg-[#E8DEF8] rounded-full overflow-hidden">
			<div
				className="h-full bg-[#794ebf] rounded-full"
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default Progress;
