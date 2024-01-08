//useDebounce 훅 정의
//특정값 (value)에 대해 디바운스 기능을 제공. 지정된 지연시간동안 값의 변경을 기다린 후 최종 값 반환
import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  //value나 delay가 변경될때마다 로직실행
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);
  //최종적으로 디바운스 처리 된 debouncedValue 반환
  return debouncedValue;
};
