import {NextResponse} from 'next/server';

import {OrderBySortType, DataSortType} from '@libs/constants/app';
import {dataService} from '@libs/services';

const getOrderBy = (sort: DataSortType) => {
  let result = {};

  switch (sort) {
    case DataSortType.NAME_UP:
      result = {
        datahash: OrderBySortType.ASC,
      };

      break;
    case DataSortType.NAME_DOWN:
      result = {
        datahash: OrderBySortType.DESC,
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
    const result: ISQLUserdata[] = await dataService.getUserdatas({
      page,
      limit,
      orderBy,
      search: query.toLowerCase(),
    });

    const userdataTotal = await dataService.getUserdatasCount(query.toLowerCase());
    const pages = Math.ceil(userdataTotal / limit);

    return NextResponse.json({result, pages});
  } catch (err) {
    return NextResponse.json(err, {status: 500});
  }
}
