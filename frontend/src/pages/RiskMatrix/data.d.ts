export interface RiskMatrixItemType {
  id: string;
  value?: number;
  user?: string;
}

export interface HazardInstanceItemType {
  pk: string;
  hi_name?: string;
  hi_desc?: string;
  
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