import {DataShowType} from '@libs/constants/app';
import WidgetUserdataCard from '@widget/userdataCard';

import './index.scss';

// Widget - Userdata List
export default function WidgetUserdataList(props: IWidgetUserdataListProps) {
  const {title = '', data, max, showType = DataShowType.GRID} = props;

  return (
    <div className="widget-userdata_list">
      {title !== '' && <h3>{title}</h3>}
      <ul className={`${DataShowType[showType].toLowerCase()}-list`}>
        {data.map((item, index) => {
          return (
            index < max && (
              <li key={item.datahash}>
                <WidgetUserdataCard
                  datahash={item.datahash}
                  timestamp={Number(item.create_datetime)}
                  owner={item.data_owner}
                  metaId={item.meta_id}
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
