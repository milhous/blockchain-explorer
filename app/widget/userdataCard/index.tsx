import Link from 'next/link';
import {useFormatter} from 'next-intl';
import classnames from 'classnames';

import {DataShowType} from '@libs/constants/app';
import PagesRoute from '@libs/constants/routes';
import {getThumbAccount} from '@libs/utils';

import './index.scss';

// Widget - Userdata Card
export default function WidgetUserdataCard(props: IWidgetUserdataCardProps) {
  const {datahash, owner, metaId, timestamp, showType = DataShowType.GRID} = props;
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
    <div className={classnames('widget-userdata_card', `${DataShowType[showType].toLowerCase()}-card`)}>
      <dl>
        <dt>Datahash: {datahash}</dt>
        <dd>MetaId: {metaId}</dd>
      </dl>
      <ul>
        <li>
          <span>{owner}</span>
        </li>
        <li>
          <span>{time}</span>
        </li>
      </ul>
    </div>
  );
}
