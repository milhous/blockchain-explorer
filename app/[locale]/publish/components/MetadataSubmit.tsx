'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Button} from '@mui/material';
import useSWR from 'swr';

import {IMetadataFormValues} from './MetadataForm';
import './MetadataSubmit.scss';

const fetcher = async (url: string, data: Omit<IMetadataFormValues, 'checkbox'>): Promise<any> => {
  try {
    const res = await fetch(url, {
      body: JSON.stringify({
        data,
      }),
      method: 'POST',
    });
    const json = await res.json();

    console.log('json', json);

    return json;
  } catch (err) {
    console.log('err', err);

    return err;
  }
};

const useMetadata = (formData: Omit<IMetadataFormValues, 'checkbox'>) => {
  const {data, mutate, error, isLoading, isValidating} = useSWR(
    !!formData ? ['/api/publish', formData] : null,
    ([url, formData]) => fetcher(url, formData),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    res: data,
    mutate,
    isLoading,
    isValidating,
    isError: error,
  };
};

export default function MetadataSubmit(props: {
  data: Omit<IMetadataFormValues, 'checkbox'>;
  onBack: () => void;
  onSubmit: (metaId: string) => void;
}) {
  const {data, onBack, onSubmit} = props;
  const t = useTranslations('btn');
  const {res, mutate, isLoading, isValidating, isError} = useMetadata(data);

  const [isDisabled, setDisableState] = useState<boolean>(false);

  const handlePublish = async () => {
    if (!isLoading && isValidating) {
      return;
    }

    const {metadata, dataHash} = res;

    setDisableState(true);

    globalThis?.fabricmask.transfer(
      {
        channelName: 'jasmy-nft-dev',
        chaincodeId: 'sos',
        functionName: 'defineMetaData',
        functionArgs: [dataHash, metadata],
      },
      (data: any) => {
        const {status, streamData} = data;

        if (status === 'success' && typeof onSubmit === 'function') {
          if (streamData.status === 'SUCCESS') {
            onSubmit(dataHash);
          } else {
            setDisableState(false);

            // toast.error(t('error_metaId_invalid').replace('{{metaId}}', metaId));
          }
        } else {
          setDisableState(false);
        }
      },
    );
  };

  return (
    <div className="publish-submit">
      <article>
        <dl>
          <dt>1. Create Tokens & Pricing</dt>
          <dd>
            The Data NFT representing your asset, the Datatokens defining access to it, and the pricing schema are all
            created in a single transaction.
          </dd>
        </dl>
        <dl>
          <dt>2. Construct & Encrypt DDO</dt>
          <dd>
            Entered metadata is transformed into a structured document (DDO) where the file URLs, and the whole DDO
            itself are encrypted.
          </dd>
        </dl>
        <dl>
          <dt>3. Publish</dt>
          <dd>
            The encrypted DDO is stored on-chain as part of the Data NFT. Indexers like Aquarius can decrypt the DDO for
            displaying purposes, but the file URLs can only be decrypted by exchanging the respective datatokens for
            this asset.
          </dd>
        </dl>
      </article>
      <aside>
        <Button variant="outlined" onClick={onBack}>
          {t('back')}
        </Button>
        <Button variant="contained" disabled={isDisabled} onClick={handlePublish}>
          {t('submit')}
        </Button>
      </aside>
    </div>
  );
}
