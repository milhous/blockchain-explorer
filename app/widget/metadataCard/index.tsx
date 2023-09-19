import Link from 'next/link';
import {useFormatter} from 'next-intl';
import classnames from 'classnames';

import {DataShowType} from '@libs/constants/app';
import PagesRoute from '@libs/constants/routes';
import {getThumbAccount} from '@libs/utils';

import './index.scss';

// Widget - Metadata Card
export default function WidgetMetadataCard(props: IWidgetMetadataCardProps) {
  const {title, desc, owner, metaId, dataVolume = -1, timestamp = -1, showType = DataShowType.GRID} = props;
  const format = useFormatter();
  let time = '';

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
    <div className={classnames('widget-metadata_card', `${DataShowType[showType].toLowerCase()}-card`)}>
      <Link href={`${PagesRoute.METADATA}/${metaId}`} title={title}>
        <dl>
          <dt>{title}</dt>
          <dd>{desc}</dd>
        </dl>
        <ul>
          <li>
            <span>{getThumbAccount(owner)}</span>
          </li>
          {dataVolume > -1 && (
            <li>
              <span>{dataVolume} data</span>
            </li>
          )}
          {timestamp > -1 && (
            <li>
              <span>{time}</span>
            </li>
          )}
        </ul>
      </Link>
    </div>
  );
}
