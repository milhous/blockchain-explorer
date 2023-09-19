'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {Button, TextField} from '@mui/material';

import PagesRoute from '@libs/constants/routes';

import './QueryUserdata.scss';

export interface IQueryFormValues {
  metaId: string;
}

export default function QueryUserdata() {
  const t = useTranslations();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: {isDirty, isValid},
  } = useForm<IQueryFormValues>({
    defaultValues: {
      metaId: '',
    },
  });

  const onSubmit = async (data: IQueryFormValues) => {
    console.log(data);

    router.push(`${PagesRoute.SAVE}/${data.metaId}`);
  };

  useEffect(() => {}, []);

  return (
    <div className="save-query">
      <h2>{t('save.query.title')}</h2>
      <p>{t('save.query.desc')}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>MetaID</h3>
          <Controller
            name="metaId"
            control={control}
            rules={{
              required: true,
              validate: {
                trim: v => v.trim() !== '',
              },
            }}
            render={({field}) => <TextField {...field} id="metaId" className="w-full" type="text" />}
          />
        </div>
        <Button sx={{mx: 'auto', display: 'block'}} variant="contained" disabled={!isDirty || !isValid} type="submit">
          {t('btn.query')}
        </Button>
      </form>
    </div>
  );
}
