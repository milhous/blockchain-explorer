'use client';

import {useState} from 'react';

import {useProvider} from '@store/Provider';
import UIConnect from '@ui/connect';

import CompMetadataStepper, {MetadataStepType} from './MetadataStepper';
import CompMetadataForm, {IMetadataFormValues} from './MetadataForm';
import CompMetadataPreview from './MetadataPreview';
import CompMetadataSubmit from './MetadataSubmit';
import CompMetadataResult from './MetadataResult';
import './PublishMetadata.scss';

export default function PublishMetadata() {
  const {state} = useProvider();
  const {address} = state;

  const [activeIndex, setActiveIndex] = useState<number>(MetadataStepType.METADATA);
  const [data, setData] = useState<Omit<IMetadataFormValues, 'checkbox'>>();
  const [metaId, setMetaId] = useState<string>('');

  const handleBack = () => {
    const index = activeIndex - 1;

    if (index >= MetadataStepType.METADATA) {
      setActiveIndex(index);
    }
  };

  const handleContinue = () => {
    const index = activeIndex + 1;

    if (index <= MetadataStepType.RESULT) {
      setActiveIndex(index);
    }
  };

  const handleMetedata = (data: Omit<IMetadataFormValues, 'checkbox'>) => {
    setData(data);

    setActiveIndex(MetadataStepType.PREVIEW);
  };

  const handleSubmit = (metaId: string) => {
    setMetaId(metaId);

    setActiveIndex(MetadataStepType.RESULT);
  };

  const handleResult = () => {
    setActiveIndex(MetadataStepType.METADATA);
  };

  return (
    <section className="publish-metadata">
      <div>
        <CompMetadataStepper activeIndex={activeIndex} />
        <UIConnect className="connect-wallet">
          {activeIndex === MetadataStepType.METADATA && <CompMetadataForm callback={handleMetedata} />}
          {activeIndex === MetadataStepType.PREVIEW && (
            <CompMetadataPreview data={data!} onBack={handleBack} onContinue={handleContinue} />
          )}
          {activeIndex === MetadataStepType.SUBMIT && (
            <CompMetadataSubmit data={data!} onBack={handleBack} onSubmit={handleSubmit} />
          )}
          {activeIndex === MetadataStepType.RESULT && (
            <CompMetadataResult metaId={metaId} owner={address} callback={handleResult} />
          )}
        </UIConnect>
      </div>
    </section>
  );
}
