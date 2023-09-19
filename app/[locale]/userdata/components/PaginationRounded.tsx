'use client';

import {Pagination} from '@mui/material';

import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';

import './PaginationRounded.scss';

export default function PaginationRounded() {
  const {state, dispatch} = useProvider();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({
      type: ReducerEventType.UPDATE_USERDATA_PAGE_STATE,
      payload: {
        userdataPage: value,
        userdataPages: state.userdataPages,
      },
    });
  };

  return (
    <div className="metadata-pagination">
      {state.userdataPages > 1 && (
        <Pagination
          count={state.userdataPages}
          variant="outlined"
          shape="rounded"
          page={state.userdataPage}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
