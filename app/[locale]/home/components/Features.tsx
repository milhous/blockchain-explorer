import {useTranslations} from 'next-intl';

import './Features.scss';

export default function HomeFeatures() {
  const t = useTranslations('home.features');

  return (
    <div id="features" className="home-features">
      <section>
        <h3>{t('title')}</h3>
        <p>{t('desc')}</p>
        <ul>
          <li>
            <dl>
              <dt>{t('subtitle1')}</dt>
              <dd>{t('subdesc1')}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>{t('subtitle2')}</dt>
              <dd>{t('subdesc2')}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>{t('subtitle3')}</dt>
              <dd>{t('subdesc3')} </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>{t('subtitle4')}</dt>
              <dd>{t('subdesc4')}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>{t('subtitle5')}</dt>
              <dd>{t('subdesc5')}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>{t('subtitle6')}</dt>
              <dd>{t('subdesc6')}</dd>
            </dl>
          </li>
        </ul>
      </section>
    </div>
  );
}
