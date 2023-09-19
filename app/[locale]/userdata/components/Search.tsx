'use client';

import {useSearchParams} from 'next/navigation';
import {useState, useDeferredValue, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {TextField, InputAdornment} from '@mui/material';
import classnames from 'classnames';

import Assets from '@assets/index';
import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';

import './Search.scss';

export default function Search() {
  const searchParams = useSearchParams();
  const metaId = searchParams.get('metaId');
  const {state, dispatch} = useProvider();
  const {control, setValue} = useForm({
    defaultValues: {
      query: metaId || state.userdataQuery,
    },
  });

  const [query, setQuery] = useState<string>(metaId || state.userdataQuery);
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
      type: ReducerEventType.SEARCH_USERDATA_QUERY,
      payload: {
        userdataQuery: deferredQuery,
      },
    });

    dispatch({
      type: ReducerEventType.UPDATE_USERDATA_PAGE_STATE,
      payload: {
        userdataPage: 1,
        userdataPages: 0,
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
            placeholder="Search by MetaId / Address / Data Hash"
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
                    className={classnames('btn-clear', deferredQuery.length === 0 && 'disabled')}
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
