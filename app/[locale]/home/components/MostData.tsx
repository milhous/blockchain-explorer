import Link from 'next/link';
import {useTranslations} from 'next-intl';

import Assets from '@assets/index';
import {OrderBySortType, METADATA_SHOW_MAX} from '@libs/constants/app';
import PagesRoute from '@libs/constants/routes';
import {dataService} from '@libs/services';
import WidgetMetadataList from '@widget/metadataList';

async function getData(): Promise<IMetadata[]> {
  const result: IMetadata[] = [];
  const metadatas = await dataService.getMetadatas({
    page: 0,
    limit: METADATA_SHOW_MAX,
    orderBy: {
      userdata: {
        _count: OrderBySortType.DESC,
      },
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

  return (
    <WidgetMetadataList title={t('home.most_data.title')} data={data} max={METADATA_SHOW_MAX} showDataVolume={true} />
  );
};

const ViewAllMetadata = () => {
  const t = useTranslations();

  return (
    <Link className="btn-all" href={PagesRoute.METADATA}>
      <span>{t('btn.view_all_metadata')}</span>
      <Assets.IconChevronRight />
    </Link>
  );
};

export default async function MostData() {
  const data = await getData();

  return (
    <section>
      <MetadataList data={data} />
      <ViewAllMetadata />
    </section>
  );
}
