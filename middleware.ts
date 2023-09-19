import createMiddleware from 'next-intl/middleware';

import {DEFAULT_LOCALE, LOCALES} from '@libs/constants/app';

export default createMiddleware({
  // A list of all locales that are supported
  locales: LOCALES,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
