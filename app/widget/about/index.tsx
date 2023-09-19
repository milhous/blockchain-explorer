import Assets from '@assets/index';

import './index.scss';

// Widget - About
export default function WidgetAbout(props: IWidgetAboutProps) {
  const {title = '', desc = ''} = props;

  return (
    <div className="widget-about">
      <section>
        <Assets.PicBg />
        <h2>{title}</h2>
        <h3>{desc}</h3>
      </section>
    </div>
  );
}
