import Link from 'next/link';
import {useTranslations} from 'next-intl';

import PagesRoute from '@libs/constants/routes';
import WidgetTheme from '@widget/theme';
import WidgetLanguage from '@widget/language';

import CompMenu from './components/Menu';
import './index.scss';

export default function UIHeader() {
  const t = useTranslations('nav');

  return (
    <header className="ui-header">
      <section>
        <h1>
          <Link href={PagesRoute.HOME} title={t('home')}>
            data market
          </Link>
        </h1>
        <nav>
          <Link href={PagesRoute.HOME} title={t('home')}>
            {t('home')}
          </Link>
          <Link href={PagesRoute.METADATA} title={t('metadata')}>
            {t('metadata')}
          </Link>
          <Link href={PagesRoute.USERDATA} title={t('userdata')}>
            {t('userdata')}
          </Link>
          <Link href={PagesRoute.PUBLISH} title={t('publish')}>
            {t('publish')}
          </Link>
          <Link href={PagesRoute.SAVE} title={t('save')}>
            {t('save')}
          </Link>
          <Link href={PagesRoute.PROFILE} title={t('profile')}>
            {t('profile')}
          </Link>
          <Link href={PagesRoute.CONTACT} title={t('contact')}>
            {t('contact')}
          </Link>
        </nav>
        <div className="toolbar">
          <WidgetLanguage />
          <div className="toolbar-theme">
            <WidgetTheme />
          </div>
          <div className="toolbar-menu">
            <CompMenu />
          </div>
        </div>
      </section>
    </header>
  );
}
