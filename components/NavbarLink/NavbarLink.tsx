import { ubuntuBold } from '@/fonts/ubuntu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface INavBarLinkProps {
  href: string;
  children: string;
}

const NavbarLink = ({ href, children: text }: INavBarLinkProps) => {
  //usePathname 훅 : 현재 페이지의 경로를 가져옴
  const path = usePathname();
  console.log(path);
  // 현재 페이지의 경로가 이 링크의 href와 동일한지 여부를 나타나는 불리언값
  const isCurrentPage = path === href;

  return (
    <li>
      <Link
        href={href}
        className={`navbarLink__link p-1 ${
          // 조건부 스타일링
          isCurrentPage ? 'text-[var(--sky-color)]' : 'text-black'
        }
        text-[1.17rem] hover:text-[var(--sky-color)]
        transition-all
        duration-500 ease-out ${ubuntuBold.className}`}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavbarLink;
