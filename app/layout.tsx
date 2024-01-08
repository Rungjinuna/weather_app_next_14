import { Inter } from 'next/font/google';
import '@/styles/global.css';
import PageLayout from '@/layouts/PageLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* children props를 받아 PageLayout 구성요소 내에서 렌더링한다 */}
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
