import { WeatherDbData } from '@/models/weatherDbData';
import { useChosenCity } from '@/store/useChosenCity';
import React from 'react';

interface ICitySearchBarItemProps {
  city?: WeatherDbData;
  noResultText?: string;
  onClick: () => void;
}

const CitySearchBarItem = ({
  city,
  onClick,
  noResultText,
}: ICitySearchBarItemProps) => {
  // 선택된 도시데이터에 접근하고 필요에따라 업데이트 할 수있는 useChoseCity훅(zustand)
  const { setChosenCity } = useChosenCity();

  return (
    <div
      // div요소가 클릭될때,
      //city가 존재하고 그값이 null이나 undefined 또는 빈 문자열이 아니라면 if(city)
      //setChoseCity 함수호출하여 선택된 도시를 city로 변경
      //부모 요소로부터 전달받은 onClick함수 실행 (CitySearchBar 부모 컴포넌트에서 각 CitySearchBarItem에 전달된 함수)
      onClick={() => {
        if (city) {
          setChosenCity(city);
        }
        onClick();
      }}
      className={`searchBarResult
        px-3
        py-2
        border-b-2
        rounded-[10px]
        transition-colors
        duration-200
        text-black
        bg-white
        hover:text-white
        hover:bg-[var(--sky-color)]
        w-full`}
    >
      <div
        className={`searchBarResult__container
        gap-3
        flex
        justify-start
        relative`}
      >
        {noResultText ? (
          <span className={`searchBarResult__noResultText`}>
            {noResultText}
          </span>
        ) : (
          ''
        )}
        {city ? (
          city.name.length <= 28 ? (
            city.name
          ) : (
            <span className={`searchBarResult__cityName`}>
              {city.name.slice(0, 28)}...
            </span>
          )
        ) : (
          ''
        )}
        <span
          className={`searchBarResult__country
          absolute
          top-[0px]
          right-0
          opacity-40
          font-bold`}
        >
          {city ? city.country : ''}
        </span>
      </div>
    </div>
  );
};

export default CitySearchBarItem;
