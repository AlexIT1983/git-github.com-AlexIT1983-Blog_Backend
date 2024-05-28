// утилита для задержки в 2 сек перед поиском

export const debounce = (fn, delay) => {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(fn, delay, ...args);
	};
};
