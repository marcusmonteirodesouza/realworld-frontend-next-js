import {NextRequest} from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import {auth} from '@/auth';
import {locales} from '@/navigation';
 
const publicPages = ['/', '/login'];
 
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});
 
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
 
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return auth();
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};