const Price = ({ price }: { price: number }) => {
	if (price === 0) {
		return <span>$0.00</span>;
	} else if (Math.abs(price) < 1) {
		return <span>{(price * 100).toFixed(0)}¢</span>;
	} else {
		return <span>${price.toFixed(2)}</span>;
	}
};

export default Price;
