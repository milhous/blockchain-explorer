import {useTranslations} from 'next-intl';

import './ResultNoData.scss';

export default function ResultNoData(props: {query: string}) {
  const {query} = props;
  const t = useTranslations('error.search');

  return (
    <section className="metadata-result">
      <div className="no-data">
        <h3>{t('no_results')}</h3>
        <p>
          {t.rich('no_results_desc', {
            query: chunks => <strong>{query}</strong>,
          })}
        </p>
      </div>
    </section>
  );
}
