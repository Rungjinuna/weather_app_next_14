'use client';
import Header from '@/components/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//react query는 react 애플리케이션에서 서버상태관리를 위한 도구.
//react query 라이브러리는 데이터가져오기, 캐싱, 동기화 및 업데이트 같은 작업을 처리
import React from 'react';

//new QueryClient를 이용해서 QueryClient 인스턴스 생성
//QueryClient인스턴스는 비동기 데이터 가져오기 작업에 대한 설정, 캐싱, 상태 관리등 담당
//생성된 인스턴스를 queryClient 변수에 할당
//QueryClientProvider를 통해서 애플리케이션의 다른 부분에서 사용될 수 있다.
const queryClient = new QueryClient();

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  //자식 컴포넌트들을 children prop으로 받아와 렌더링
  return (
    //QueryClientProvider 컴포넌트를 사용하여 queryClient인스턴스를 애플리케이션의 다른 부분에 제공.
    //하위 컴포넌트에서 데이터 가져오기 작업을 쉽게 수행 할 수 있다.
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
    </QueryClientProvider>
  );
};

export default PageLayout;
