'use client';

import {Pagination} from '@mui/material';

import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';

import './PaginationRounded.scss';

export default function PaginationRounded() {
  const {state, dispatch} = useProvider();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({
      type: ReducerEventType.UPDATE_METADATA_PAGE_STATE,
      payload: {
        metadataPage: value,
        metadataPages: state.metadataPages,
      },
    });
  };

  return (
    <div className="metadata-pagination">
      {state.metadataPages > 1 && (
        <Pagination
          count={state.metadataPages}
          variant="outlined"
          shape="rounded"
          page={state.metadataPage}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
