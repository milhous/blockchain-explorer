'use client';

import {useEffect} from 'react';
import useSWR from 'swr';

import {DATA_PAGE_LIMIT, DataSortType} from '@libs/constants/app';
import {useProvider} from '@store/Provider';
import {ReducerEventType} from '@store/reducer';
import WidgetMetadataList from '@widget/metadataList';

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
    ['/api/metadata', conditions],
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
    query: state.query,
    sort: state.sortType,
    page: state.metadataPage - 1,
    limit: DATA_PAGE_LIMIT,
  });

  useEffect(() => {
    if (!isLoading && !isValidating) {
      let payload = {
        metadataPage: 1,
        metadataPages: 0,
      };

      if (data?.pages) {
        payload = {
          metadataPage: state.metadataPage,
          metadataPages: data.pages,
        };
      }

      dispatch({
        type: ReducerEventType.UPDATE_METADATA_PAGE_STATE,
        payload,
      });
    }
  }, [data, isLoading, isValidating]);

  if (isError) return <ResultError />;
  if (isLoading) return <ResultSpinner />;

  if (!data || !Array.isArray(data.result) || data.result.length === 0) return <CompResultNoData query={state.query} />;

  return (
    <section className="metadata-result">
      <WidgetMetadataList
        data={data.result}
        max={DATA_PAGE_LIMIT}
        showDataVolume={true}
        showTime={true}
        showType={state.showType}
      />
    </section>
  );
}
