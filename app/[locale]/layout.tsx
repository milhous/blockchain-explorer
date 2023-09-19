import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

import UIHeader from '@ui/header';
import UIFooter from '@ui/footer';
import UINotification from '@ui/notification';
import {Provider} from '@store/Provider';

import './globals.scss';

export const metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
};

interface IRootLayoutProps {
  params?: {locale: string};
  children?: React.ReactNode;
}

export default async function RootLayout<IRootLayoutProps>({children, params: {locale}}) {
  let messages: {[key: string]: any};

  try {
    messages = (await import(`../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <UIHeader />
            {children}
            <UIFooter />
            <UINotification />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
