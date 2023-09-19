'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import Assets from '@assets/index';
import PagesRoute from '@libs/constants/routes';
import WidgetTheme from '@widget/theme';
import WidgetDrawer, {WidgetDrawerAnchorType} from '@widget/drawer';

import './Menu.scss';

export default function HeaderMenu() {
  const t = useTranslations('nav');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawer = (state: boolean) => {
    setDrawerOpen(state);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-gray-100"
        onClick={() => handleDrawer(true)}
      >
        <Assets.IconMenu />
      </button>
      <WidgetDrawer
        className="ui-header-menu"
        anchor={WidgetDrawerAnchorType.RIGHT}
        open={drawerOpen}
        onClose={handleDrawer}
      >
        <div className="ui-header-menu_content">
          <ul className="h-full">
            <li>
              <Link href={PagesRoute.HOME} title={t('home')}>
                {t('home')}
              </Link>
            </li>
            <li>
              <Link href={PagesRoute.METADATA} title={t('metadata')}>
                {t('metadata')}
              </Link>
            </li>
            <li>
              <Link href={PagesRoute.USERDATA} title={t('userdata')}>
                {t('userdata')}
              </Link>
            </li>
            <li>
              <Link href={PagesRoute.PUBLISH} title={t('publish')}>
                {t('publish')}
              </Link>
            </li>
            <li>
              <Link href={PagesRoute.SAVE} title={t('save')}>
                {t('save')}
              </Link>
            </li>
            <li>
              <Link href={PagesRoute.PROFILE} title={t('profile')}>
                {t('profile')}
              </Link>
            </li>
            <li>
              <Link href={PagesRoute.CONTACT} title={t('contact')}>
                {t('contact')}
              </Link>
            </li>
            <li>
              {t('theme')}
              <WidgetTheme />
            </li>
          </ul>
        </div>
      </WidgetDrawer>
    </div>
  );
}
