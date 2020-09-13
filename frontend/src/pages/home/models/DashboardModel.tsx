import { Effect, Reducer } from 'umi';
import { RiskMatrixItemType, HazardInstanceItemType, HazardTypeItemType, 
          SystemFunctionItemType, SystemItemType, CareSettingItemType, ProcessSystemItemType } from '../data';
import { queryRiskMatrix, queryHazardInstance, queryHazardType, queryProcessSystem, 
          querySystem, querySystemFunction, queryCareSetting } from '../service';

/** Risk Matrix */
export interface DashboardState {
  rmData?: RiskMatrixItemType[];
  hiData?: HazardInstanceItemType[];
  sfData?: SystemFunctionItemType[];
  htData?: HazardTypeItemType[];
  psData?: ProcessSystemItemType[];
  syData?: SystemItemType[];
  csData?: CareSettingItemType[];
}
export interface ModelType {
  namespace: string;
  state: DashboardState;
  effects: {
    fetchProcessSystem: Effect;
    fetchRiskMatrix: Effect;
    fetchHazardInstance: Effect;
    fetchSystemFunction: Effect;
    fetchHazardType: Effect;
    fetchSystem: Effect;
    fetchCareSetting: Effect;

  };
  reducers: {
    fetchProcessSystemReducer: Reducer<DashboardState>;
    fetchRiskMatrixReducer: Reducer<DashboardState>;
    fetchHazardInstanceReducer: Reducer<DashboardState>;
    fetchSystemFunctionReducer: Reducer<DashboardState>;
    fetchHazardTypeReducer: Reducer<DashboardState>;
    fetchSystemReducer: Reducer<DashboardState>;
    fetchCareSettingReducer: Reducer<DashboardState>;
  };
}

const Model: ModelType = {
  namespace: 'DashboardSpace',

  state: {
    rmData: [],
    hiData: [],
    sfData: [],
    htData: [],
    psData: [],
    syData: [],
    csData: [],

  },

  effects: {
    *fetchCareSetting({ payload }, { call, put }) {
			const response = yield call(queryCareSetting, payload);
			yield put({
				type: 'fetchCareSettingReducer',
				payload: response.data,
      });
      return response.data;
    },

    *fetchSystem({ payload }, { call, put }) {
			const response = yield call(querySystem, payload);
			yield put({
				type: 'fetchSystemReducer',
				payload: response.data,
      });
      return response.data;
    },
    
    *fetchRiskMatrix({ payload }, { call, put }) {
      const response = yield call(queryRiskMatrix, payload);
      yield put({
        type: 'fetchRiskMatrixReducer',
        payload: response.data,
      });
      return response.data;
    },

		*fetchHazardInstance({ payload }, { call, put }) {
			const response = yield call(queryHazardInstance, payload);
			yield put({
				type: 'fetchHazardInstanceReducer',
				payload: response.data,
      });
      return response.data;
    },

    *fetchSystemFunction({ payload }, { call, put }) {
			const response = yield call(querySystemFunction, payload);
			yield put({
				type: 'fetchSystemFunctionReducer',
				payload: response.data,
      });
      return response.data;
    },

    *fetchHazardType({ payload }, { call, put }) {
			const response = yield call(queryHazardType, payload);
			yield put({
				type: 'fetchHazardTypeReducer',
				payload: response.data,
      });
      return response.data;
    },

    *fetchProcessSystem({ payload }, { call, put }) {
			const response = yield call(queryProcessSystem, payload);
			yield put({
				type: 'fetchProcessSystemReducer',
				payload: response.data,
      });
      return response.data
    },

  },

  reducers: {

    fetchCareSettingReducer(state, action) {
			return {
        ...state,
				csData: action.payload,
			};
    },

    fetchSystemReducer(state, action) {
			return {
				...state,
				syData: action.payload,
			};
    },
    
    fetchProcessSystemReducer(state, action) {
			return {
				...state,
				psData: action.payload,
			};
    },

    fetchRiskMatrixReducer(state, action) {
      return {
        ...state,
        rmData: action.payload,
      };
    },

    fetchHazardInstanceReducer(state, action) {
			return {
				...state,
				hiData: action.payload,
			};
    },
    
    fetchSystemFunctionReducer(state, action) {
			console.log(action.payload);
			return {
				...state,
				sfData: action.payload,
			};
    },
    
    fetchHazardTypeReducer(state, action) {
			return {
				...state,
				htData: action.payload,
			};
		},

  },
};

export default Model;
