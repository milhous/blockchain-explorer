import {useFormatter, useTranslations} from 'next-intl';
import {Button} from '@mui/material';

import PagesRoute from '@libs/constants/routes';

import './Details.scss';

export default function Details(props: {data: any}) {
  const {data} = props;
  const {meta_id, data_title, data_desc, data_meta, data_owner, data_volume, create_datetime} = data;
  const t = useTranslations();
  const format = useFormatter();
  const timestamp = Number(create_datetime);
  let time = '';
  const meta = JSON.parse(data_meta);

  if (timestamp > -1) {
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
  }

  return (
    <section className="metadata-details">
      <div className="card">
        <article>
          <h3>{data_title}</h3>
          <p>{data_desc}</p>
          <p>{t('common.metadata_fields')}:</p>
          <div className="metadata">
            <dl>
              <dt>{t('common.name')}</dt>
              <dd>{t('common.description')}</dd>
            </dl>
            {Object.keys(meta.properties).map(item => {
              const desc = meta.properties[item].description;

              return (
                <dl key={item}>
                  <dt>{item}</dt>
                  <dd>{desc}</dd>
                </dl>
              );
            })}
          </div>
        </article>
        <aside>
          <dl>
            <dt>MetaID</dt>
            <dd className="whitespace-normal break-all">{meta_id}</dd>
          </dl>
          <dl>
            <dt>{t('common.data_volume')}</dt>
            <dd>{data_volume}</dd>
          </dl>
          <dl>
            <dt>{t('common.owner')}</dt>
            <dd className="whitespace-normal break-all">{data_owner}</dd>
          </dl>
          <dl>
            <dt>{t('common.created')}</dt>
            <dd>{time}</dd>
          </dl>
          <div className="btn">
            <Button variant="contained" href={`${PagesRoute.SAVE}/${meta_id}`}>
              {t('btn.save_userdata')}
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
