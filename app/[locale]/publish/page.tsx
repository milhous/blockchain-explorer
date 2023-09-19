import {useTranslations} from 'next-intl';

import WidgetAbout from '@widget/about';

import CompPublishMetadata from './components/PublishMetadata';

export default function PagePublish() {
  const t = useTranslations('publish.about');

  return (
    <main className="page-publish">
      <WidgetAbout title={t('title')} desc={t('desc')} />
      <CompPublishMetadata />
    </main>
  );
}
