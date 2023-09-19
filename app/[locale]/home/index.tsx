import {useTranslations} from 'next-intl';

import WidgetAbout from '@widget/about';

import CompRecentlyPublished from './components/RecentlyPublished';
import CompMostData from './components/MostData';
import './index.scss';

export default function Home() {
  const t = useTranslations('home.about');

  return (
    <main className="page-home">
      <WidgetAbout
        title={t('title')}
        desc={t.rich('desc', {
          strong: chunks => <strong>{chunks}</strong>,
        })}
      />
      <CompRecentlyPublished />
      <CompMostData />
    </main>
  );
}
