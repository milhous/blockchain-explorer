import {useTranslations} from 'next-intl';
import {Stepper, Step, StepLabel} from '@mui/material';

import './MetadataStepper.scss';

export enum MetadataStepType {
  METADATA,
  PREVIEW,
  SUBMIT,
  RESULT,
}

export default function MetadataStepper(props: {activeIndex: number}) {
  const {activeIndex} = props;
  const t = useTranslations('common');
  const steps = ['metadata', 'preview', 'submit', 'result'];

  return (
    <div className="publish-stepper">
      <Stepper activeStep={activeIndex} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{t(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
