import {useTranslations} from 'next-intl';

import WidgetAbout from '@widget/about';

import CompQueryUserdata from './components/QueryUserdata';

const SaveAbout = () => {
  const t = useTranslations('save.about');

  return <WidgetAbout title={t('title')} desc={t('desc')} />;
};

export default async function PageSave() {
  return (
    <main className="page-userdata">
      <SaveAbout />
      <CompQueryUserdata />
    </main>
  );
}
