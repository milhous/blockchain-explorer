'use client';

import {useTranslations} from 'next-intl';
import {Button} from '@mui/material';
import classnames from 'classnames';

import {useSiteConnected} from '@libs/utils/hooks';
import {useProvider} from '@store/Provider';

import './index.scss';

// UI - Connect
export default function UIConnect(props: IUIConnectProps) {
  const {className = '', children} = props;
  const t = useTranslations();
  const {state} = useProvider();
  const {connections, isUnlocked} = state;
  const isConnected = useSiteConnected(connections);

  const handleConnect = () => {
    globalThis?.fabricmask.connect();
  };

  return (
    <>
      {isUnlocked && isConnected ? (
        children
      ) : (
        <div className={classnames('widget-connect', className)}>
          <Button sx={{mx: 'auto', display: 'block'}} variant="contained" onClick={handleConnect}>
            {t('btn.connect_wallet')}
          </Button>
        </div>
      )}
    </>
  );
}
