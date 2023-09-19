import {PrismaClient} from '@prisma/client';

import {OrderBySortType} from '@libs/constants/app';

const prisma = new PrismaClient();

class CRUDService {
  constructor() {}

  async findMetadatas(params: {
    networkName: string;
    channelName: string;
    mspName: string;
    chaincodeName: string;
    skip?: number;
    take?: number;
    search?: string;
    orderBy?: {
      [key: string]: any;
    };
  }): Promise<IServiceMetadata[]> {
    const {networkName, channelName, mspName, chaincodeName, skip, take, search = '', orderBy = {}} = params;
    const pagination = {};

    if (Number.isInteger(skip) && Number.isInteger(take)) {
      pagination['skip'] = skip;
      pagination['take'] = take;
    }

    let OR = {};

    if (search !== '') {
      OR = {
        OR: [
          {
            meta_id: {
              search,
            },
          },
          {
            data_title: {
              search,
            },
          },
          {
            data_desc: {
              search,
            },
          },
          {
            data_meta: {
              search,
            },
          },
          {
            data_owner: {
              search,
            },
          },
        ],
      };
    }

    const result = await prisma.metadata.findMany({
      where: {
        msps: {
          name: mspName,
        },
        chaincodes: {
          networks: {
            name: networkName,
          },
          channels: {
            name: channelName,
          },
          name: chaincodeName,
        },
        ...OR,
      },
      include: {
        _count: {
          select: {
            userdata: true,
          },
        },
      },
      orderBy: {
        ...orderBy,
      },
      ...pagination,
    });

    return result;
  }

  async findUserdatas(params: {
    networkName: string;
    channelName: string;
    mspName: string;
    chaincodeName: string;
    skip?: number;
    take?: number;
    search?: string;
    orderBy?: {
      [key: string]: any;
    };
  }): Promise<ISQLUserdata[]> {
    const {networkName, channelName, mspName, chaincodeName, skip, take, search = '', orderBy = {}} = params;
    const pagination = {};

    if (Number.isInteger(skip) && Number.isInteger(take)) {
      pagination['skip'] = skip;
      pagination['take'] = take;
    }

    let OR = {};

    if (search !== '') {
      OR = {
        OR: [
          {
            meta_id: {
              search,
            },
          },
          {
            datahash: {
              search,
            },
          },
          {
            data_owner: {
              search,
            },
          },
        ],
      };
    }

    const result = await prisma.userdata.findMany({
      where: {
        msps: {
          name: mspName,
        },
        chaincodes: {
          networks: {
            name: networkName,
          },
          channels: {
            name: channelName,
          },
          name: chaincodeName,
        },
        ...OR,
      },
      orderBy: {
        ...orderBy,
      },
      ...pagination,
    });

    return result;
  }

  async findMetadata(metaId: string): Promise<IServiceMetadata | null> {
    const result = await prisma.metadata.findUnique({
      where: {
        meta_id: metaId,
      },
      include: {
        _count: {
          select: {
            userdata: true,
          },
        },
      },
    });

    return result;
  }

  async countMetadata(params: {
    networkName: string;
    channelName: string;
    mspName: string;
    chaincodeName: string;
    search?: string;
  }): Promise<number> {
    const {networkName, channelName, mspName, chaincodeName, search = ''} = params;

    let OR = {};

    if (search !== '') {
      OR = {
        OR: [
          {
            meta_id: {
              search,
            },
          },
          {
            data_title: {
              search,
            },
          },
          {
            data_desc: {
              search,
            },
          },
          {
            data_meta: {
              search,
            },
          },
          {
            data_owner: {
              search,
            },
          },
        ],
      };
    }

    const result = await prisma.metadata.count({
      where: {
        msps: {
          name: mspName,
        },
        chaincodes: {
          networks: {
            name: networkName,
          },
          channels: {
            name: channelName,
          },
          name: chaincodeName,
        },
        ...OR,
      },
    });

    return result;
  }

  async countUserdata(params: {
    networkName: string;
    channelName: string;
    mspName: string;
    chaincodeName: string;
    search?: string;
  }): Promise<number> {
    const {networkName, channelName, mspName, chaincodeName, search} = params;
    let OR = {};

    if (search !== '') {
      OR = {
        OR: [
          {
            meta_id: {
              search,
            },
          },
          {
            datahash: {
              search,
            },
          },
          {
            data_owner: {
              search,
            },
          },
        ],
      };
    }

    const result = await prisma.userdata.count({
      where: {
        msps: {
          name: mspName,
        },
        chaincodes: {
          networks: {
            name: networkName,
          },
          channels: {
            name: channelName,
          },
          name: chaincodeName,
        },
        ...OR,
      },
    });

    return result;
  }
}

const crudService = new CRUDService();

export default crudService;
