import {useTranslations} from 'next-intl';

import './Contact.scss';

export default function HomeContact() {
  const t = useTranslations('home.contact');

  return (
    <div id="contact" className="home-contact">
      <section>
        <dl>
          <dt>{t('title')}</dt>
          <dd>{t('desc')}</dd>
        </dl>
        <a className="btn" href="#" title={t('btn')}>
          {t('btn')}
        </a>
      </section>
    </div>
  );
}
