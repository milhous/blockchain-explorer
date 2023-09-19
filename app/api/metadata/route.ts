import {NextResponse} from 'next/server';

import {OrderBySortType, DataSortType} from '@libs/constants/app';
import {dataService} from '@libs/services';

const getOrderBy = (sort: DataSortType) => {
  let result = {};

  switch (sort) {
    case DataSortType.NAME_UP:
      result = {
        data_title: OrderBySortType.ASC,
      };

      break;
    case DataSortType.NAME_DOWN:
      result = {
        data_title: OrderBySortType.DESC,
      };

      break;
    case DataSortType.DATA_VOLUME_UP:
      result = {
        userdata: {
          _count: OrderBySortType.ASC,
        },
      };

      break;
    case DataSortType.DATA_VOLUME_DOWN:
      result = {
        userdata: {
          _count: OrderBySortType.DESC,
        },
      };

      break;
    case DataSortType.TIME_UP:
      result = {
        create_datetime: OrderBySortType.ASC,
      };

      break;
    case DataSortType.TIME_DOWN:
      result = {
        create_datetime: OrderBySortType.DESC,
      };

      break;
  }

  return result;
};

export async function POST(request: Request) {
  const data = await request.json();

  const {query = '', sort = DataSortType.NONE, page, limit} = data;

  const orderBy = getOrderBy(sort);

  try {
    const metadatas: IServiceMetadata[] = await dataService.getMetadatas({
      page,
      limit,
      orderBy,
      search: query.toLowerCase(),
    });

    const metadataTotal = await dataService.getMetadataCount(query.toLowerCase());
    const pages = Math.ceil(metadataTotal / limit);

    const result: IMetadata[] = [];

    for (const item of metadatas) {
      result.push({
        ...item,
        data_volume: item._count.userdata,
      });
    }

    return NextResponse.json({result, pages});
  } catch (err) {
    return NextResponse.json(err, {status: 500});
  }
}

export async function GET(request: Request) {
  try {
    const data = {};

    return NextResponse.json({data});
  } catch (err) {
    return NextResponse.json(err, {status: 500});
  }
}
