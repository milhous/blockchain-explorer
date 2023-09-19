'use client';

import {useEffect} from 'react';
import useSWR from 'swr';

import {DATA_PAGE_LIMIT} from '@libs/constants/app';
import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';
import WidgetUserdataList from '@widget/userdataList';

import CompResultNoData from './ResultNoData';
import './SearchResult.scss';

const fetcher = async (url: string, data: any): Promise<any> => {
  try {
    const res = await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
    });
    const json = await res.json();

    return json;
  } catch (err) {
    console.log('err', err);

    return err;
  }
};

const useSearchResult = (conditions: any) => {
  const {data, error, isLoading, isValidating} = useSWR(
    ['/api/userdata', conditions],
    ([url, conditions]) => fetcher(url, conditions),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    isLoading,
    isValidating,
    isError: error,
  };
};

const ResultError = () => {
  return (
    <section className="metadata-result">
      <div className="error">failed to load</div>
    </section>
  );
};

const ResultSpinner = () => {
  return (
    <section className="metadata-result">
      <div className="spinner">loading...</div>
    </section>
  );
};

export default function SearchResult() {
  const {state, dispatch} = useProvider();
  const {data, isLoading, isValidating, isError} = useSearchResult({
    query: state.userdataQuery,
    sort: state.userdataSortType,
    page: state.userdataPage - 1,
    limit: DATA_PAGE_LIMIT,
  });

  useEffect(() => {
    if (!isLoading && !isValidating) {
      let payload = {
        userdataPage: 1,
        userdataPages: 0,
      };

      if (data?.pages) {
        payload = {
          userdataPage: state.userdataPage,
          userdataPages: data.pages,
        };
      }

      dispatch({
        type: ReducerEventType.UPDATE_USERDATA_PAGE_STATE,
        payload,
      });
    }
  }, [data, isLoading, isValidating]);

  if (isError) return <ResultError />;
  if (isLoading) return <ResultSpinner />;

  if (!data || !Array.isArray(data.result) || data.result.length === 0)
    return <CompResultNoData query={state.userdataQuery} />;

  return (
    <section className="metadata-result">
      <WidgetUserdataList data={data.result} max={DATA_PAGE_LIMIT} showType={state.showType} />
    </section>
  );
}
