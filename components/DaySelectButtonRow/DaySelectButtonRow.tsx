import { WeatherListElement } from '@/models/weatherRequest';
import React from 'react';
import DaySelectButton from '../DaySelectButton/DaySelectButton';

interface DaySelectButtonRowProps {
  //현재 선택되어 표시되고있는 날짜를 나타내는 숫자
  dayShowing: number;
  //특정 날짜에 대한 날씨 정보를 담고있는 Map객체, 객체의 key는 날짜, value는 해당 날짜의 날씨데이터의 배열
  sixDaysInfo: Map<string, WeatherListElement[]>;
  //선택된 날짜를 설정하는 함수
  setDayShowing: (day: number) => void;
}

const DaySelectButtonRow = ({
  dayShowing,
  sixDaysInfo,
  setDayShowing,
}: DaySelectButtonRowProps) => {
  return (
    <div>
      {/* sixDaysInfo.keys()를 사용하여 모든 키(날짜)를 배열로 변환하고, 
        map 함수를 사용하여 각 키에 대해 DaySelectButton을 생성.
        DaySelectButton에는 고유한 key,
        선택 여부(isSelected), 클릭 핸들러(onClick), 그리고 날짜(date)가 전달된다. */}
      {[...sixDaysInfo.keys()].map((key, index) => {
        const mapDayWeather = sixDaysInfo.get(key);
        if (mapDayWeather)
          return (
            <DaySelectButton
              key={key}
              isSelected={dayShowing === index}
              onClick={() => setDayShowing(index)}
              date={mapDayWeather[0].dt_txt.split(' ')[0].slice(5) ?? ''}
              text={''}
            />
          );
      })}
    </div>
  );
};

export default DaySelectButtonRow;
