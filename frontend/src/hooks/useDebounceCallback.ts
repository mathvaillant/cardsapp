import { useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounceCallback = (callback: () => void, delay: number, dependencies: any[]): void => {
    const { reset, clear } = useTimeout(callback, delay);

    // reset it once user hits the target again before delay ends up
    useEffect(reset, [...dependencies, reset]);

    // clear it on mount before it fires
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(clear, []);
};

export default useDebounceCallback;