'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Button} from '@mui/material';

import * as toast from '@widget/toastify';

import './UserdataDetails.scss';

const queryData = (metaId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    globalThis?.fabricmask.queryData(metaId, (res: any) => {
      resolve(res.storageData);
    });
  });
};

const Details = (props: {data: any}) => {
  const {data} = props;
  const elems: JSX.Element[] = [];

  if (!!data && !!data.data) {
    for (const key in data.data) {
      elems.push(
        <dl key={key} className="divide-gray/50 grid grid-cols-4 divide-x break-all">
          <dt className="bg-light-gray/50 p-3">{decodeURIComponent(key)}</dt>
          <dd className="col-span-3 p-3">{data.data[key]}</dd>
        </dl>,
      );
    }
  }

  return <div className="userdata">{elems}</div>;
};

export default function UserdataDetails(props: {
  metaId: string;
  datahash: string;
  onBack: () => void;
  onComplete: () => void;
}) {
  const {metaId, datahash, onBack, onComplete} = props;
  const t = useTranslations();

  const [viewData, setViewData] = useState<{[key: string]: any}>({});
  const [isLoading, setLoadingState] = useState<boolean>(false);

  const handlePublish = async () => {
    setLoadingState(true);

    globalThis?.fabricmask.transfer(
      {
        channelName: 'jasmy-nft-dev',
        chaincodeId: 'sos',
        functionName: 'publishMetaRecord',
        functionArgs: [metaId, datahash],
      },
      (data: any) => {
        const {status, streamData} = data;

        if (status === 'success' && typeof onComplete === 'function') {
          if (streamData.status === 'SUCCESS') {
            onComplete();
          } else {
            setLoadingState(false);

            toast.error(t('error_metaId_invalid').replace('{{metaId}}', metaId));
          }
        } else {
          setLoadingState(false);
        }
      },
    );
  };

  useEffect(() => {
    (async () => {
      const result = await queryData(metaId);

      if (Array.isArray(result) && result.length > 0) {
        const arr = result.filter(item => item.dataHash === datahash);

        if (arr.length) {
          setViewData(arr[0]);
        }
      }
    })();
  }, []);

  return (
    <div className="save-details">
      <article>
        <p>
          The encrypted DDO is stored on-chain as part of the Data NFT. Indexers like Aquarius can decrypt the DDO for
          displaying purposes, but the file URLs can only be decrypted by exchanging the respective datatokens for this
          asset.
        </p>
        <Details data={viewData} />
      </article>
      <aside>
        <Button variant="outlined" onClick={onBack}>
          {t('btn.back')}
        </Button>
        <Button variant="contained" onClick={handlePublish} disabled={isLoading}>
          {t('btn.publish')}
        </Button>
      </aside>
    </div>
  );
}
