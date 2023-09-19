'use client';

import {useState, useDeferredValue, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {TextField, InputAdornment} from '@mui/material';
import classnames from 'classnames';

import Assets from '@assets/index';
import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';

import './Search.scss';

export default function Search() {
  const {state, dispatch} = useProvider();
  const {control, setValue} = useForm({
    defaultValues: {
      query: state.query,
    },
  });

  const [query, setQuery] = useState<string>(state.query);
  const deferredQuery = useDeferredValue(query);

  const handleClear = () => {
    if (deferredQuery.length === 0) {
      return;
    }

    setQuery('');

    setValue('query', '');
  };

  useEffect(() => {
    dispatch({
      type: ReducerEventType.SEARCH_METADATA_QUERY,
      payload: {
        query: deferredQuery,
      },
    });

    dispatch({
      type: ReducerEventType.UPDATE_METADATA_PAGE_STATE,
      payload: {
        metadataPage: 1,
        metadataPages: 0,
      },
    });
  }, [deferredQuery]);

  return (
    <div className="metadata-search">
      <Controller
        name="query"
        control={control}
        rules={{
          onChange: evt => {
            setQuery(evt.target.value);
          },
        }}
        render={({field}) => (
          <TextField
            {...field}
            className="w-full"
            type="text"
            placeholder="Search..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Assets.IconSearch />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Assets.IconXCircle
                    className={classnames('btn-clear', query.length === 0 && 'disabled')}
                    onClick={handleClear}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
