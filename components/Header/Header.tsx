import Link from 'next/link';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import NavbarLink from '../NavbarLink/NavbarLink';
import CitySearchBar from '../CitySearchBar/CitySearchBar';
import { ubuntuBold } from '@/fonts/ubuntu';

const Header = () => {
  return (
    <header className='flex  justify-center w-full min-w-full p-4 header h-fit'>
      <div className='flex flex-wrap justify-around w-4/5 h-full min-h-full gap-4 header__container'>
        <div className='flex header__left'>
          <Link href='/' className='self-center header__title w-fit h-fit'>
            <h2 className='title__text w-fit h-fit'>
              <span
                className={`title__blue text-[1.7rem] text-[var(--sky-color)] ${ubuntuBold.className}`}
              >
                날씨
              </span>{' '}
              <span
                className={`title__black text-[1.7rem] text-black ${ubuntuBold.className}`}
              >
                앱
              </span>
            </h2>
          </Link>
          <div className='header__split w-[1px] h1/2 bg-slate-300 self-center mx-6' />
          <Navbar>
            <NavbarLink href='/'>Home</NavbarLink>
            <NavbarLink href='/about'>About</NavbarLink>
          </Navbar>
        </div>
        <div className='self-center header__right'>
          <CitySearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
