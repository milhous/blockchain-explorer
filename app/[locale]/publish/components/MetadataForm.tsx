'use client';

import {useTranslations} from 'next-intl';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {Button, TextField, Checkbox} from '@mui/material';

import Assets from '@assets/index';
import {METADATA_FIELDS_MAX} from '@libs/constants/app';

import './MetadataForm.scss';

export interface IMetadataFormValues {
  title: string;
  desc: string;
  fields: {name: string; desc: string}[];
  checkbox: boolean;
}

export default function MetadataForm(props: {callback: (data: any) => void}) {
  const {callback} = props;
  const t = useTranslations();

  const {
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<IMetadataFormValues>({
    defaultValues: {
      title: '',
      desc: '',
      fields: [{name: '', desc: ''}],
      checkbox: false,
    },
  });
  const {fields, append, remove} = useFieldArray({
    name: 'fields',
    control,
  });

  const onSubmit = async (data: IMetadataFormValues) => {
    if (typeof callback === 'function') {
      callback(data);
    }
  };

  const handleAppend = () => {
    append({name: '', desc: ''});
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div className="publish-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>{t('common.title')}</h3>
          <Controller
            name="title"
            control={control}
            rules={{
              required: true,
              validate: {
                trim: v => v.trim() !== '',
              },
            }}
            render={({field}) => <TextField {...field} className="w-full" />}
          />
        </div>
        <div>
          <h3>{t('common.description')}</h3>
          <Controller
            name="desc"
            control={control}
            rules={{
              required: true,
              validate: {
                trim: v => v.trim() !== '',
              },
            }}
            render={({field}) => <TextField {...field} className="w-full" multiline rows={5} />}
          />
        </div>
        <div>
          <h3>{t('common.metadata_fields')}</h3>
          <div className="form-list">
            {fields.map((field, index) => {
              return (
                <div className="form-fields" key={field.id}>
                  <div>
                    <Controller
                      name={`fields.${index}.name`}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field}) => (
                        <TextField {...field} className="w-full" type="text" placeholder={t('common.name')} />
                      )}
                    />
                    <Controller
                      name={`fields.${index}.desc`}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field}) => (
                        <TextField {...field} className="w-full" type="text" placeholder={t('common.description')} />
                      )}
                    />
                  </div>
                  {index === 0 && fields.length < METADATA_FIELDS_MAX && (
                    <Assets.IconPlusCircle onClick={handleAppend} />
                  )}
                  {index === 0 && fields.length >= METADATA_FIELDS_MAX && <Assets.IconSlash className="disabled" />}
                  {index > 0 && <Assets.IconMinusCircle onClick={() => handleRemove(index)} />}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Controller
            name="checkbox"
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <label htmlFor="agree">
                <Checkbox sx={{py: 0, alignItems: 'flex-start'}} {...field} id="agree" defaultChecked={false} />
                {t('common.terms_conditions')}
              </label>
            )}
          />
        </div>
        <Button sx={{mx: 'auto', display: 'block'}} variant="contained" disabled={!isValid} type="submit">
          {t('btn.continue')}
        </Button>
      </form>
    </div>
  );
}
