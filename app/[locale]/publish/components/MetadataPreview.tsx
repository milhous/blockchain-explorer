'use client';

import {useTranslations} from 'next-intl';
import {Button} from '@mui/material';

import {IMetadataFormValues} from './MetadataForm';
import './MetadataPreview.scss';

export default function MetadataPreview(props: {
  data: Omit<IMetadataFormValues, 'checkbox'>;
  onBack: () => void;
  onContinue: () => void;
}) {
  const {data, onBack, onContinue} = props;
  const {title = '', desc = '', fields = []} = data;
  const t = useTranslations();

  return (
    <div className="publish-preview">
      <article>
        <h3>{title}</h3>
        <p>{desc}</p>
        <p>{t('publish.preview.sample_tables')}:</p>
        <ul>
          {fields.map(item => (
            <li key={item.name}>
              <strong>{item.name}</strong> - {item.desc}
            </li>
          ))}
        </ul>
      </article>
      <aside>
        <Button variant="outlined" onClick={onBack}>
          {t('btn.back')}
        </Button>
        <Button variant="contained" onClick={onContinue}>
          {t('btn.continue')}
        </Button>
      </aside>
    </div>
  );
}
