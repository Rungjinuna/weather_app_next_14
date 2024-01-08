import WeatherInfoBar from '@/components/WeatherInfoBar/WeatherInfoBar';
import React from 'react';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <WeatherInfoBar />
    </main>
  );
}
