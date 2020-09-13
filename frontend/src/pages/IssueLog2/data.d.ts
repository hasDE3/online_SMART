export interface TableListItem {
  pk: string;
  il_index: string;
  il_name: string;
  il_desc: string;
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
  pk: string;
  il_index:string;
  il_name: string;
  il_desc: string;
}
