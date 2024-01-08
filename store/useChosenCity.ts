//zustand 라이브러리를 사용하여 useChosenCity훅정의
//선택된도시의 상태를 관리하고 해당 상태를 업데이트 할 수 있는 함수(setChosenCity)를 제공함

import { WeatherDbData } from '@/models/weatherDbData';
import { create } from 'zustand';

export interface ChosenCityState {
  //chosenCity는 WeatherDbData타입의 객체
  //setChosenCity는 새로운 도시데이터를 인자로 받아 전역상태 업데이트 함수
  chosenCity: WeatherDbData;
  setChosenCity: (newCity: WeatherDbData) => void;
}

//useChosenCity훅 생성
//zustand의 create함수를 사용하여 스토어생성
//초기값 setChosenCity함수는 set콜백을 이용하여 chosenCity상태를 업데이트한다.
//이 함수는 새로운 도시데이터를 받아 스토어의 chosenCity값을 변경한다.
export const useChosenCity = create<ChosenCityState>((set) => ({
  //초기값설정, 초기값의 타입설정
  chosenCity: {
    id: 0,
    name: '',
    coord: {
      lat: 0,
      lon: 0,
    },
  } as WeatherDbData,
  //setChosenCity함수는 set콜백을 사용하여 chosenCity상태 업데이트.
  //이 함수는 새로운 도시 데이터를 받아 스토어의 chosenCity값을 변경함
  setChosenCity: (newCity: WeatherDbData) =>
    set(() => {
      return { chosenCity: newCity };
    }),
}));
