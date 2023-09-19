import {useTranslations} from 'next-intl';
import {Button} from '@mui/material';

import Assets from '@assets/index';
import WidgetSvga from '@widget/svga';

import './MetadataResult.scss';

export default function MetadataResult(props: {metaId: string; owner: string; callback: () => void}) {
  const {metaId, owner, callback} = props;
  const t = useTranslations();

  return (
    <div className="publish-result">
      <Assets.IconCheckCircle />
      <dl>
        <dt>{t('publish.result.title')}</dt>
        <dd>{t('publish.result.desc')}</dd>
      </dl>
      <dl>
        <dt>MetaID</dt>
        <dd className="break-all">{metaId}</dd>
      </dl>
      <dl>
        <dt>{t('common.owner')}</dt>
        <dd className="break-all">{owner}</dd>
      </dl>
      <Button variant="contained" onClick={callback}>
        {t('btn.continue')}
      </Button>
      <WidgetSvga className="reslut-svga" url={Assets.svgaRibbon} />
    </div>
  );
}
