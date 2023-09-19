import {DataShowType} from '@libs/constants/app';
import WidgetMetadataCard from '@widget/metadataCard';

import './index.scss';

// Widget - Published List
export default function WidgetMetadataList(props: IWidgetMetadataListProps) {
  const {title = '', data, max, showDataVolume = false, showTime = false, showType = DataShowType.GRID} = props;

  return (
    <div className="widget-metadata_list">
      {title !== '' && <h3>{title}</h3>}
      <ul className={`${DataShowType[showType].toLowerCase()}-list`}>
        {data.map((item, index) => {
          return (
            index < max && (
              <li key={item.meta_id}>
                <WidgetMetadataCard
                  title={item.data_title}
                  desc={item.data_desc}
                  owner={item.data_owner}
                  metaId={item.meta_id}
                  dataVolume={showDataVolume ? item.data_volume : -1}
                  timestamp={showTime ? Number(item.create_datetime) : -1}
                  showType={showType}
                />
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
