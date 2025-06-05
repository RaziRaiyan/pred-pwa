import { useEffect } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
	useEffect(() => {
		try {
			const item = localStorage.getItem(key);
			if (!item) {
				localStorage.setItem(key, JSON.stringify(defaultValue));
			}
		} catch (error) {
			console.error(`Error accessing localStorage for key "${key}":`, error);
		}
	}, [key, defaultValue]);

	const getValue = (): T => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.error(
				`Error reading from localStorage for key "${key}":`,
				error,
			);
			return defaultValue;
		}
	};

	const setValue = (value: T) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Error writing to localStorage for key "${key}":`, error);
		}
	};

	return { getValue, setValue };
}
