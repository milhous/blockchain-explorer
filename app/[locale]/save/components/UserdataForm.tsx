'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {Button, TextField} from '@mui/material';

import Assets from '@assets/index';
import {useProvider} from '@store/Provider';
import * as toast from '@widget/toastify';

import './UserdataForm.scss';

export interface IUserdataFormValues {
  words: {word: string}[];
}

const sign = (address: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    globalThis.fabricmask.sign(address, (data: any) => {
      if (data.status !== 'success') {
        reject(false);

        return;
      }

      const {signature} = data.streamData;

      if (!!signature) {
        resolve(signature);
      } else {
        reject(false);
      }
    });
  });
};

const encrypt = (metaId: string, data: any): Promise<any> => {
  return new Promise(resolve => {
    globalThis?.fabricmask.encrypt(metaId, data, (res: any) => {
      resolve(res.cryptoData);
    });
  });
};

const saveData = (metaId: string, data: any): Promise<any> => {
  return new Promise(resolve => {
    globalThis?.fabricmask.saveData(metaId, data, (res: any) => {
      resolve(res);
    });
  });
};

const queryData = (metaId: string): Promise<any> => {
  return new Promise(resolve => {
    globalThis?.fabricmask.queryData(metaId, (res: any) => {
      resolve(res.storageData);
    });
  });
};

export default function UserdataForm(props: {metadata: ISQLMetadata; onComplete: (data: any) => void}) {
  const {metadata, onComplete} = props;
  const {state} = useProvider();
  const t = useTranslations();

  const {meta_id: metaId, data_title, data_desc, data_meta} = metadata;
  const {address} = state;
  const meta = JSON.parse(data_meta);

  const [keys, setKeys] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    formState: {isDirty, isValid},
  } = useForm<IUserdataFormValues>({
    defaultValues: {
      words: [{word: ''}],
    },
  });
  const {fields, insert} = useFieldArray({
    name: 'words',
    control,
  });

  const formatData = (data: {word: string}[]): {[key: string]: string} => {
    const res = {};

    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      const val = data[i].word;

      res[encodeURIComponent(key)] = val;
    }

    return res;
  };

  const onSubmit = async (data: IUserdataFormValues) => {
    const info = formatData(data.words);
    const signature = await sign(address);
    const cryptoData = await encrypt(metaId, info);

    try {
      const res = await fetch('/api/shared-information', {
        body: JSON.stringify({
          address,
          metaId,
          info: cryptoData,
          signature,
        }),
        method: 'POST',
      });
      const json = await res.json();

      if (json?.errorMsg) {
        toast.error('' + json.errorMsg);
      } else {
        const data = [{dataHash: json.dataHash, time: json.time, data: info}];
        const storageData = await queryData(metaId);

        if (Array.isArray(storageData)) {
          for (const item of storageData) {
            if (data.length < 5 && item.dataHash !== json.dataHash) {
              data.push(item);
            }
          }
        }

        await saveData(metaId, data);

        onComplete({...json});
      }
    } catch (err) {
      toast.error('' + err);
    }
  };

  useEffect(() => {
    const arr: string[] = [];

    if (meta?.properties) {
      const properties = meta.properties;
      const names = Object.keys(properties);
      for (let i = 0, len = names.length; i < len; i++) {
        arr.push(names[i]);

        insert(i, {word: ''});
      }
    }

    setKeys(arr);
  }, []);

  return (
    <div className="save-form">
      <h2>{data_title}</h2>
      <p>{data_desc}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          if (index > keys.length - 1) {
            return;
          }

          return (
            <div key={field.id}>
              <h3>{keys[index]}</h3>
              <Controller
                name={`words.${index}.word`}
                control={control}
                rules={{
                  required: true,
                  validate: {
                    trim: v => v.trim() !== '',
                  },
                }}
                render={({field}) => <TextField {...field} id={keys[index]} className="w-full" type="text" />}
              />
            </div>
          );
        })}
        <Button sx={{mx: 'auto', display: 'block'}} variant="contained" disabled={!isDirty || !isValid} type="submit">
          {t('btn.save')}
        </Button>
      </form>
    </div>
  );
}
