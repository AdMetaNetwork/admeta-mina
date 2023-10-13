import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            // Check if the item is a valid JSON string
            try {
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                // If not, return the item directly
                return item || initialValue;
            }
        }
        return initialValue;
    });

    const setValue = (value: T | ((val: T) => T)) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        // Check if the value is a string, if so, store it directly
        if (typeof valueToStore === 'string') {
            window.localStorage.setItem(key, valueToStore);
        } else {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage;
