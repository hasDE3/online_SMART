export interface MenuItemDataType {
  pk: string;
  sy_name: string;
  sy_desc?: string;
}

export interface ListItemDataType {
  pk: string;
  sf_name: string;
  sf_desc?: string;
  sf_parent?: string;
}
