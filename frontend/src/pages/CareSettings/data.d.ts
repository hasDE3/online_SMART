export interface TableListItem {
  pk: string;
  cs_index: string;
  cs_name: string;
  cs_desc: string;
}

export interface TableListPagination {
  total: number;
  size: number;
  page: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  // GET /api/caresettings/?current=1&pageSize=20 HTTP/1.1" 200 215
  pk: string;
  cs_name: string;
  cs_desc: string;
  //size?: number;
  //page?: number;
}

export interface ProcessNodeItemType {
  id?: string;
  label?: string;
  x?: number;
  y?: number;
  color?: string;
  size?: string;
  shape?: string;

  pn_desc?: string;
  pn_cs?: string;
  pn_ps?: string;
}
