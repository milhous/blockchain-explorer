import Link from 'next/link';
import {useTranslations, useFormatter} from 'next-intl';

import Assets from '@assets/index';
import {OrderBySortType, METADATA_SHOW_MAX} from '@libs/constants/app';
import PagesRoute from '@libs/constants/routes';
import {dataService} from '@libs/services';

import './Userdata.scss';

async function getData(metaId: string): Promise<ISQLUserdata[]> {
  const result = await dataService.getUserdatas({
    page: 0,
    limit: METADATA_SHOW_MAX,
    orderBy: {
      create_datetime: OrderBySortType.DESC,
    },
    search: metaId,
  });

  return result;
}

const CreateTime = (props: {timestamp: number}) => {
  const {timestamp} = props;
  const format = useFormatter();
  let time = '';

  const dateTime = new Date(timestamp);
  const now = new Date();

  if (now.getTime() - timestamp < 24 * 60 * 60 * 1000) {
    time = format.relativeTime(dateTime, now);
  } else {
    time = format.dateTime(dateTime, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return time;
};

const ViewAllPublished = (props: {metaId: string}) => {
  const t = useTranslations();

  return (
    <Link
      className="btn-all"
      href={{
        pathname: PagesRoute.USERDATA,
        query: {metaId: props.metaId},
      }}
    >
      <span>{t('btn.view_all_userdata')}</span>
      <Assets.IconChevronRight />
    </Link>
  );
};

const NoData = () => {
  const t = useTranslations('error.search');

  return (
    <div className="no-data">
      <h3>{t('no_results')}</h3>
    </div>
  );
};

const UserdataList = (props: {data: ISQLUserdata[]}) => {
  const t = useTranslations('common');

  return (
    <div className="metadata-userdata_list">
      {props.data.map(({datahash, data_owner, create_datetime}) => {
        return (
          <ul key={datahash}>
            <li>
              DataHash: <span>{datahash}</span>
            </li>
            <li>
              {t('owner')}: <span>{data_owner}</span>
            </li>
            <li>
              {t('created')}:{' '}
              <span>
                <CreateTime timestamp={Number(create_datetime)} />
              </span>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default async function Userdata(props: {metaId: string}) {
  const {metaId} = props;
  const data = await getData(metaId);

  return (
    <section className="metadata-userdata">
      <div className="card">
        {data.length > 0 ? <UserdataList data={data} /> : <NoData />}
        <ViewAllPublished metaId={metaId} />
      </div>
    </section>
  );
}
