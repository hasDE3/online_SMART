export interface NodeGroupItemType {
  id: string;
  x?: number;
  y?: number;
  label?: string;
  ng_ps?: string;
}
export interface ProcessSystemItemType {
  pk: string;
  ps_name: string;
  ps_desc: string;
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
  
  parent?: string;
}

export interface ProcessEdgeItemType {
  id?: string;
  label?: string;
  source: string;
  target?: string;
  pe_ps?: string;
  pe_desc?: string;
}

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

export interface SystemFunctionItemType {
  pk: string;
  sf_name: string;
  sf_desc?: string;
  sf_parent?: string;
}

export interface CareSettingItemType {
  pk: string;
  cs_name: string;
  cs_desc: string;
}

export interface ProcessNode_SystemFunctionItemType {
  id?: string;
  pn: string;
  sf: string;
}

export interface ProcessNode_HazardInstanceItemType {
  id?: string;
  pn: string;
  hi: string;
}

export interface SystemItemType {
  pk: string;
  sy_name: string;
  sy_desc?: string;
}