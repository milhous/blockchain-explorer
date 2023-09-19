import {useTranslations} from 'next-intl';
import {Stepper, Step, StepLabel} from '@mui/material';

import './UserdataStepper.scss';

export enum UserdataStepType {
  SAVE,
  PUBLISH,
  RESULT,
}

export default function UserdataStepper(props: {activeIndex: number}) {
  const {activeIndex} = props;
  const t = useTranslations('common');
  const steps = ['save', 'publish', 'result'];

  return (
    <div className="save-stepper">
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
