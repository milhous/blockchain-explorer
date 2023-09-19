declare interface ISQLNetwork {
  network_id: number;
  name: string;
}

declare interface ISQLChannel {
  channel_id: number;
  name: string;
}

declare interface ISQLChaincode {
  chaincode_id: number;
  name: string;
  version: string;
  network_id: number;
  channel_id: number;
}

declare interface ISQLBlock {
  block_id: number;
  block_num: number;
  network_id: number;
  channel_id: number;
}

declare interface ISQLTransaction {
  txhash: string;
  read_set: {[key: string]: any}[];
  write_set: {[key: string]: any}[];
  createdt: string;
  msp_id: number;
  block_id: number;
  chaincode_id: number;
}

declare interface ISQLMetadata {
  meta_id: string;
  data_title: string;
  data_desc: string;
  data_meta: string;
  data_owner: string;
  create_datetime: string;
  msp_id: number;
  chaincode_id: number;
}

declare interface ISQLUserdata {
  datahash: string;
  data_owner: string;
  create_datetime: string;
  meta_id: string;
  msp_id: number;
  chaincode_id: number;
}

declare interface IServiceMetadata extends ISQLMetadata {
  _count: {userdata: number};
}

declare interface IMetadata extends ISQLMetadata {
  data_volume: number;
}
