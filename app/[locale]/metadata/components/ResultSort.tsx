'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

import {DataSortType} from '@libs/constants/app';
import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';

import './ResultSort.scss';

const getSortType = (name: string, type: DataSortType): number => {
  let sortType = DataSortType.NONE;

  switch (name) {
    case 'name':
      sortType = type === DataSortType.NAME_DOWN ? DataSortType.NAME_UP : DataSortType.NAME_DOWN;

      break;
    case 'data_volume':
      sortType = type === DataSortType.DATA_VOLUME_DOWN ? DataSortType.DATA_VOLUME_UP : DataSortType.DATA_VOLUME_DOWN;

      break;
    case 'time':
      sortType = type === DataSortType.TIME_DOWN ? DataSortType.TIME_UP : DataSortType.TIME_DOWN;

      break;
  }

  return sortType;
};

const getActiveState = (name: string, type: DataSortType): string => {
  let active = '';

  switch (name) {
    case 'name':
      if (type === DataSortType.NAME_UP) {
        active = 'up';
      } else if (type === DataSortType.NAME_DOWN) {
        active = 'down';
      }

      break;
    case 'data_volume':
      if (type === DataSortType.DATA_VOLUME_UP) {
        active = 'up';
      } else if (type === DataSortType.DATA_VOLUME_DOWN) {
        active = 'down';
      }

      break;
    case 'time':
      if (type === DataSortType.TIME_UP) {
        active = 'up';
      } else if (type === DataSortType.TIME_DOWN) {
        active = 'down';
      }

      break;
  }

  return active;
};

const SortName = (props: {name: string}) => {
  const {name} = props;
  const t = useTranslations('common');
  const {state, dispatch} = useProvider();

  const handleSwitch = () => {
    const sortType = getSortType(name, state.sortType);

    dispatch({
      type: ReducerEventType.SWITCH_METADATA_SORT_TYPE,
      payload: {
        sortType,
      },
    });

    dispatch({
      type: ReducerEventType.UPDATE_METADATA_PAGE_STATE,
      payload: {
        metadataPage: 1,
        metadataPages: state.metadataPages,
      },
    });
  };

  return (
    <li className={getActiveState(name, state.sortType)}>
      <span onClick={handleSwitch}>{t(name)}</span>
    </li>
  );
};

export default function ResultSort() {
  return (
    <div className="metadata-sort">
      <ul>
        <SortName name="name" />
        <SortName name="data_volume" />
        <SortName name="time" />
      </ul>
    </div>
  );
}
