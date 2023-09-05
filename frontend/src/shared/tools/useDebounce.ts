import { useCallback, useRef } from 'react';

export const useDebounce = (delay=600, ignoreDelayInFirstQuery=true) => {

  const isFirstQuery = useRef(ignoreDelayInFirstQuery);
  const debouncing = useRef<number | null>(null);

  const debounce = useCallback((func:()=>void)=>{
    if (isFirstQuery.current) {
      isFirstQuery.current = false;
      func();
      return;
    }

    if (debouncing.current) {
      clearTimeout(debouncing.current);
    }

    debouncing.current = setTimeout(() => {
      func();
    }, delay);
  }, []);

  return { debounce };
};
