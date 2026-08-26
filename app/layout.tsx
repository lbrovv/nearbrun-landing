import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nearbrun.com'),
  title: 'NearbRun (널브런) | 내 위치에서 시작하는 러닝',
  description: '현재 위치에서 달리기 좋은 경로를 찾고, 러닝을 기록하고 분석하세요. NearbRun이 오늘의 러닝을 함께합니다.',
  alternates: { canonical: '/' },
  icons: { icon: '/nearbrun-icon.png', apple: '/nearbrun-icon.png' },
  openGraph: {
    type: 'website',
    url: 'https://nearbrun.com',
    siteName: 'NearbRun',
    title: 'NearbRun | 내 위치에서 시작하는 러닝',
    description: '현재 위치에서 달리기 좋은 경로를 찾고 오늘의 러닝을 기록하세요.',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'ja_JP'],
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'NearbRun - 내 위치에서 시작하는 러닝' }],
  },
  twitter: { card: 'summary_large_image', title: 'NearbRun | 내 위치에서 시작하는 러닝', description: '현재 위치에서 달리기 좋은 경로를 찾고 오늘의 러닝을 기록하세요.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
