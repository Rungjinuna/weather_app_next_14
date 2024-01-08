import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { WeatherDbData } from '@/models/weatherDbData';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CitySearchBarItem from '../CitySearchBarItem/CitySearchBarItem';

const CitySearchBar = () => {
  const [search, setSearch] = useState('');
  //search라는 변수가 변경될때마다 useDebounce 훅이 변경을 감지함
  //useDebounce훅 내부에 useEffect훅은 search값 변경 감지하고 지정지연시간동안 다른변경 없는지 대기
  //지정된 시간동안 search값이 추가로 변경되지 않으면 setTimeout에 의해서 setDebouncedValue호출
  //debouncedValue값을 최신 search값으로 변경
  const debouncedSearch = useDebounce(search, 1000);
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

  const cities = useQuery({
    queryFn: async () => {
      // debouncedSearch 값이 없으면 검색결과를 표시하지 않고 빈배열 반환
      if (!debouncedSearch) {
        setIsShowingSearchResults(false);
        return [];
      }
      try {
        const fetchedCities = await axios.get<WeatherDbData[]>(
          `/api/cities/${debouncedSearch}`
        );
        // HTTP요청이 성공적이지 않을때 (상태가 200이 아니면)오류 콘솔에 기록
        // 서버에서 처리할 수 없는 요청, 서버 내부 오류 등
        if (fetchedCities.status !== 200) {
          console.error(fetchedCities);
          return [];
        }
        //요청 성공적일때 setIsShowingSearchResults를 true로 설정하고 데이터반환
        setIsShowingSearchResults(true);
        return fetchedCities.data;
        //axios호출이 예외를 발생시킬 경우 catch블록에서 오류 기록
        //요청 자체가 실패했거나 네트워크 문제등 기술적 오류 처리
      } catch (error) {
        console.error(error);
      }
    },

    //querykey는 검색쿼리 고유의 키. 이키는 캐싱, 업데이트, 무효화 등의 목적으로 내부적으로 사용됨
    queryKey: [debouncedSearch.toLocaleLowerCase()],
    //옵션처리
    //컴포넌트가 마운트 될때마다 데이터를 다시 가져올지 여부
    refetchOnMount: true,
    //창이나 탭에 포커스가 다시 맞춰질 때 데이터를 다시 가져올지 여부를 결정
    refetchOnWindowFocus: false,
  });

  //debouncedSearch 값 변경될때마다 cities쿼리 인스턴스의 refetch 메소드 호출
  //refetch 메소드는 useQuery에서 정의한 queryFn 함수를 재실행하여 새로운 쿼리 데이터 가져옴
  useEffect(() => {
    cities.refetch();
  }, [debouncedSearch]);

  return (
    <div className='searchBar'>
      <div
        className={`searchBar__bar flex justify-between w-full max-w-[300px] border-2 relative`}
      >
        <input
          type='text'
          value={search}
          // search값을 value로 이용하며 값이 입력될때마다 setSearch로 값 업데이트
          onChange={(e) => setSearch(e.target.value)}
          //isLoading는 useQuery 훅을 사용할때 반환하는 객체 중 하나임
          //요청이 진행중이고 아직 완료되지 않았을때 true로 설정됨
          placeholder={cities.isLoading ? 'Loading...' : 'Search city...'}
          className='searchBar__input w-full h-[48px] text-[1rem] px-3 py-2'
        />
        <div className='searchBar__loadingSpinner absolute right-0 top-0  w-[48px] h-[48px] grid content-center'>
          {/* refetching도 useQuery훅에서 제공 */}
          {cities.isLoading || cities.isRefetching ? (
            <LoadingSpinner width='w-[38px]' height='h-[38px]' />
          ) : null}
        </div>
      </div>
      {/* isShowingSearchResult가 있으면 CitySearchBarItem렌더링, 없으면 다른결과의 
      CitySearchBar렌더링 */}
      {isShowingSearchResults ? (
        <div>
          {/* cities의 데이터 또는 데이터의 length가 존재하면 6자로 줄이고 
          city는 CitySearchBarItem으로 매핑함 */}
          {cities.data && cities.data.length !== 0 ? (
            cities.data.slice(0, 6).map((city) => (
              <CitySearchBarItem
                city={city}
                key={city.id}
                onClick={() => {
                  setIsShowingSearchResults(false);
                  setSearch('');
                }}
              />
            ))
          ) : (
            <CitySearchBarItem
              noResultText='No results'
              onClick={() => {
                setIsShowingSearchResults(false);
                setSearch('');
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CitySearchBar;
