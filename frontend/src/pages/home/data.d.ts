export interface CareSettingItemType {
  pk: string;
  cs_name?: string;
}

export interface HazardInstanceItemType {
  pk: string;
  hi_name?: string;
}

export interface HazardTypeItemType {
  pk: string;
  ht_name?: string;
}

export interface ProcessSystemItemType {
  pk: string;
  ps_name?: string;
}

export interface SystemFunctionItemType {
  pk: string;
  sf_name?: string;
}

export interface RiskMatrixItemType {
  id: string;
  value?: number;
}

export interface SystemItemType {
  pk: string;
  sy_name?: string;
}

export interface ProcessSystemItemType {
  pk: string;
  ps_name: string;
  ps_desc: string;
}