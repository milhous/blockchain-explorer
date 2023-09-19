import {useTranslations} from 'next-intl';

import {OrderBySortType, METADATA_SHOW_MAX} from '@libs/constants/app';
import {dataService} from '@libs/services';
import WidgetMetadataList from '@widget/metadataList';

async function getData(): Promise<IMetadata[]> {
  const result: IMetadata[] = [];
  const metadatas = await dataService.getMetadatas({
    page: 0,
    limit: METADATA_SHOW_MAX,
    orderBy: {
      create_datetime: OrderBySortType.DESC,
    },
  });

  for (const item of metadatas) {
    result.push({
      ...item,
      data_volume: item._count.userdata,
    });
  }

  return result;
}

const MetadataList = (props: {data: IMetadata[]}) => {
  const {data} = props;
  const t = useTranslations();

  return <WidgetMetadataList title={t('home.recently_published.title')} data={data} max={METADATA_SHOW_MAX} />;
};

export default async function RecentlyPublished() {
  const data = await getData();

  return (
    <section>
      <MetadataList data={data} />
    </section>
  );
}
