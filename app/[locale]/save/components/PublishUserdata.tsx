'use client';

import {useState} from 'react';

import {useProvider} from '@store/Provider';
import UIConnect from '@ui/connect';

import CompUserdataStepper, {UserdataStepType} from './UserdataStepper';
import CompUserdataForm from './UserdataForm';
import CompUserdataDetails from './UserdataDetails';
import CompUserdataResult from './UserdataResult';
import './PublishUserdata.scss';

export default function PublishUserdata(props: {metadata: ISQLMetadata}) {
  const {metadata} = props;
  const {state} = useProvider();
  const {address} = state;

  const [activeIndex, setActiveIndex] = useState<number>(UserdataStepType.SAVE);
  const [datahash, setDatahash] = useState<string>('');

  const handleBack = () => {
    const index = activeIndex - 1;

    if (index >= UserdataStepType.SAVE) {
      setActiveIndex(index);
    }
  };

  const handleContinue = () => {
    const index = activeIndex + 1;

    if (index <= UserdataStepType.RESULT) {
      setActiveIndex(index);
    }
  };

  const handleSave = (data: any) => {
    setDatahash(data.dataHash);

    setActiveIndex(UserdataStepType.PUBLISH);

    console.log('handleSave', data);
  };

  const handleResult = () => {
    setActiveIndex(UserdataStepType.SAVE);
  };

  return (
    <section className="save-userdata">
      <div>
        <CompUserdataStepper activeIndex={activeIndex} />
        <UIConnect className="connect-wallet">
          {activeIndex === UserdataStepType.SAVE && <CompUserdataForm metadata={metadata} onComplete={handleSave} />}
          {activeIndex === UserdataStepType.PUBLISH && (
            <CompUserdataDetails
              metaId={metadata.meta_id}
              datahash={datahash}
              onBack={handleBack}
              onComplete={handleContinue}
            />
          )}
          {activeIndex === UserdataStepType.RESULT && (
            <CompUserdataResult metaId={metadata.meta_id} datahash={datahash} owner={address} callback={handleResult} />
          )}
        </UIConnect>
      </div>
    </section>
  );
}
