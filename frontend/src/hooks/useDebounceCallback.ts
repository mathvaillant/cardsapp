import { useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounceCallback = (callback: () => void, delay: number, dependencies: any[]): void => {
    const { reset, clear } = useTimeout(callback, delay);

    // reset it once user hits the target again before delay ends up
    useEffect(reset, [...dependencies, reset]);

    // clear it on mount before it fires
    useEffect(clear, []);
};

export default useDebounceCallback;