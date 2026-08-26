import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const country = (
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    ''
  ).toUpperCase();
  const acceptLanguage = request.headers.get('accept-language')?.toLowerCase() || '';

  const locale = country === 'KR'
    ? 'ko'
    : country === 'JP'
      ? 'ja'
      : country
        ? 'en'
        : acceptLanguage.startsWith('ja')
          ? 'ja'
          : acceptLanguage.startsWith('ko')
            ? 'ko'
            : 'en';

  return NextResponse.json(
    { locale },
    { headers: { 'Cache-Control': 'private, no-store', Vary: 'x-vercel-ip-country, cf-ipcountry, accept-language' } },
  );
}
