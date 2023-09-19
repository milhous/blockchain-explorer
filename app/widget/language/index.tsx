'use client';

import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';
import Link from 'next-intl/link';

import Assets from '@assets/index';
import {LOCALES} from '@libs/constants/app';

import './index.scss';

const Language = (props: {lng: string; pathname: string; children: React.ReactNode}) => {
  const {lng, pathname, children} = props;
  const locale = useLocale();

  return locale === lng ? (
    <li>
      <span>{children}</span>
    </li>
  ) : (
    <li>
      <Link href={`/${pathname}`} locale={lng}>
        {children}
      </Link>
    </li>
  );
};

export default function WidgetLanguage() {
  let pathname = usePathname();

  for (const lng of LOCALES) {
    const key = `/${lng}`;

    if (pathname.includes(key)) {
      pathname = pathname.replace(key, '');
    }
  }

  return (
    <div className="widget-language">
      <Assets.IconGlobe />
      <div>
        <ul>
          <Language lng="zh" pathname={pathname}>
            简体中文
          </Language>
          <Language lng="en" pathname={pathname}>
            English
          </Language>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
