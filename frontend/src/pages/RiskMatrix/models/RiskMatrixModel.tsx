import { Effect, Reducer } from 'umi';
import { RiskMatrixItemType, HazardInstanceItemType } from '../data';
import { queryRiskMatrix, addRiskMatrix, removeRiskMatrix, updateRiskMatrix,
         queryHazardInstance, updateHazardInstance } from '../service';

/** Risk Matrix */
export interface RiskMatrixState {
  rmData?: RiskMatrixItemType[];
  hiData?: HazardInstanceItemType[];
}
export interface ModelType {
  namespace: string;
  state: RiskMatrixState;
  effects: {
    fetchRiskMatrix: Effect;
    submitRiskMatrix: Effect;
    removeRiskMatrix: Effect;
    updateRiskMatrix: Effect;
    fetchHazardInstance: Effect;
    updateHazardInstance: Effect;
  };
  reducers: {
    fetchRiskMatrixReducer: Reducer<RiskMatrixState>;
    fetchHazardInstanceReducer: Reducer<RiskMatrixState>;
  };
}

const Model: ModelType = {
  namespace: 'RiskMatrixSpace',

  state: {
    rmData: [],
    hiData: [],
  },

  effects: {
    *updateHazardInstance({ payload }, { call, put }) {
      let callback;
      callback = updateHazardInstance;
  
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchHazardInstanceReducer',
        payload: response,
      });
  },

    *fetchHazardInstance({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(queryHazardInstance, payload);
			// console.log(response.data)
			yield put({
				type: 'fetchHazardInstanceReducer',
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

    *submitRiskMatrix({ payload }, { call, put }) {
      let callback;
      callback = addRiskMatrix;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchRiskMatrixReducer',
        payload: response,
      });
    },

    *updateRiskMatrix({ payload }, { call, put }) {
      let callback;
      callback = updateRiskMatrix;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchRiskMatrixReducer',
        payload: response,
      });
    },

    *removeRiskMatrix({ payload }, { call, put }) {
      const callback = removeRiskMatrix;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchRiskMatrixReducer',
        payload: {response},
      });
    }
  },

  reducers: {

    fetchHazardInstanceReducer(state, action) {
			return {
				...state,
				hiData: action.payload,
			};
    },
    
    fetchRiskMatrixReducer(state, action) {
      return {
        ...state,
        rmData: action.payload,
      };
    },
  },
};

export default Model;
