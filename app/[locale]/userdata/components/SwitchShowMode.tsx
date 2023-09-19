'use client';

import classnames from 'classnames';

import Assets from '@assets/index';
import {DataShowType} from '@libs/constants/app';
import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';

import './SwitchShowMode.scss';

export default function SwitchShowMode() {
  const {state, dispatch} = useProvider();

  const handleSwitch = (type: DataShowType) => {
    dispatch({
      type: ReducerEventType.SWITCH_METADATA_SHOW_TYPE,
      payload: {
        showType: type,
      },
    });
  };

  return (
    <div className="metadata-switch">
      <button
        className={classnames('', state.showType === DataShowType.GRID ? 'active' : '')}
        onClick={() => handleSwitch(DataShowType.GRID)}
      >
        <Assets.IconGrid />
      </button>
      <button
        className={classnames('', state.showType === DataShowType.ENTITY ? 'active' : '')}
        onClick={() => handleSwitch(DataShowType.ENTITY)}
      >
        <Assets.IconList />
      </button>
    </div>
  );
}
