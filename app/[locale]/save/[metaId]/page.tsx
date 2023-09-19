import {useTranslations} from 'next-intl';

import WidgetAbout from '@widget/about';

import crudService from '@libs/services/crudService';

import CompPublishUserdata from '../components/PublishUserdata';
import CompResultNoData from '../components/ResultNoData';

async function getData(metaId: string): Promise<ISQLMetadata | null> {
  const result = await crudService.findMetadata(metaId);

  if (!!result) {
    return result;
  }

  return null;
}

const SaveAbout = () => {
  const t = useTranslations('save.about');

  return <WidgetAbout title={t('title')} desc={t('desc')} />;
};

export default async function PageSave({
  params,
}: {
  params: {
    metaId: string;
  };
}) {
  const {metaId} = params;
  const data = await getData(metaId);

  return (
    <main className="page-userdata">
      <SaveAbout />
      {data ? <CompPublishUserdata metadata={data} /> : <CompResultNoData query={`MetaId: ${params.metaId}`} />}
    </main>
  );
}
