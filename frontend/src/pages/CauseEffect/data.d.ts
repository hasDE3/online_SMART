export interface HazardInstanceItemType {
  pk: string;
  hi_name: string;
  hi_desc?: string;
  /** More information => backend/smart_main/models.py */
  hi_inse?: number;
  hi_inli?: number;
  hi_rese?: number;
  hi_reli?: number;
  hi_inrr?: number;
  hi_rerr?: number;
  hi_clju?: string;
  
  hi_parent?: string;
  hi_ps?: string;
  hi_sf?: string;
}

export interface RiskMatrixItemType {
  id: string;
  value?: number;
  user?: string;
}

export interface HazardTypeItemType {
  pk: string;
  ht_name: string;
  ht_desc?: string;
}

export interface SystemItemType {
  pk: string;
  sy_name: string;
  sy_desc?: string;
}

export interface SystemFunctionItemType {
  pk: string;
  sf_index: string;
  sf_name: string;
  sf_desc?: string;
  sf_parent?: string;
}

