import crudService from '@libs/services/crudService';

import CompResultNoData from '../components/ResultNoData';
import CompDetails from '../components/Details';
import CompUserdata from '../components/Userdata';

async function getData(metaId: string): Promise<IMetadata | null> {
  const result = await crudService.findMetadata(metaId);

  if (!!result) {
    return {...result, data_volume: result._count.userdata};
  }

  return null;
}

export default async function Page({
  params,
}: {
  params: {
    metaId: string;
  };
}) {
  const {metaId} = params;
  const data = await getData(metaId);

  return (
    <main className="page-metadata">
      {data ? (
        <div className="space-y-6 py-14">
          <CompDetails data={data} />
          <CompUserdata metaId={metaId} />
        </div>
      ) : (
        <CompResultNoData query={`MetaId: ${params.metaId}`} />
      )}
    </main>
  );
}
