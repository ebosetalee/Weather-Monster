const getMinOrMax = (action, array) => {
	const minOrMax = array.map((it) => it[action]);
	const average = minOrMax.reduce((a, b) => a + b) / array.length;
	return Math.round(average);
};

export default getMinOrMax;
