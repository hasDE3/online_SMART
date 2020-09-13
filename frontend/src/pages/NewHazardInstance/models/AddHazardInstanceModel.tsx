import { Effect, Reducer } from 'umi';
import { HazardInstanceItemType, SystemFunctionItemType, HazardTypeItemType, RiskMatrixItemType } from '../data';
import { queryHazardInstance, addHazardInstance, updateHazardInstance, querySystemFunction, queryHazardType,
				queryRiskMatrix } from '../service';

/** Hazard Instance */

export interface AddHazardInstanceState {
	hiData?: HazardInstanceItemType[];
	sfData?: SystemFunctionItemType[];
	htData?: HazardTypeItemType[];
	rmData?: RiskMatrixItemType[];
}

export interface ModelType {
	namespace: string;
	state: AddHazardInstanceState;
	effects: {
		fetchRiskMatrix: Effect;
		fetchHazardInstance: Effect;
		submitHazardInstance: Effect;

		fetchSystemFunction: Effect;
		fetchHazardType: Effect;
		
	};
	reducers: {
		fetchRiskMatrixReducer: Reducer<AddHazardInstanceState>;
		fetchHazardInstanceReducer: Reducer<AddHazardInstanceState>;
		fetchSystemFunctionReducer: Reducer<AddHazardInstanceState>;
		fetchHazardTypeReducer: Reducer<AddHazardInstanceState>;
	};
}

const Model: ModelType = {
	namespace: 'AddHazardInstanceSpace',

	state: {
		hiData: [],
		sfData: [],
		htData: [],
		rmData: [],
	},

	effects: {
		*fetchRiskMatrix({ payload }, { call, put }) {
      const response = yield call(queryRiskMatrix, payload);
      yield put({
        type: 'fetchRiskMatrixReducer',
        payload: response.data,
      });
      return response.data;
		},
		
		/** payload is the param transformed from the index.tsx */
		*fetchHazardInstance({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(queryHazardInstance, payload);
			/**console.log(response.data)*/
			yield put({
				type: 'fetchHazardInstanceReducer',
				payload: response.data,
			});
    },
        
		*submitHazardInstance({ payload }, { call, put }) {
				let callback;
				if (payload.id) {
					callback = updateHazardInstance;
				} else {
					callback = addHazardInstance;
				}      
				const response = yield call(callback, payload);
				yield put({
					type: 'fetchHazardInstanceReducer',
					payload: response,
				});
		},

		*fetchSystemFunction({ payload }, { call, put }) {
      /** Get current state */
      const response = yield call(querySystemFunction, payload);
      /**console.log(response.data)*/
      yield put({
        type: 'fetchSystemFunctionReducer',
        payload: response.data,
      });
		},
		
		*fetchHazardType({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(queryHazardType, payload);
			/**console.log(response.data)*/
			yield put({
				type: 'fetchHazardTypeReducer',
				payload: response.data,
			});
    },

	
	},

	reducers: {
		fetchHazardInstanceReducer(state, action) {
			return {
				...state,
				hiData: action.payload,
			};
		},

		fetchSystemFunctionReducer(state, action) {
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

		fetchRiskMatrixReducer(state, action) {
      return {
        ...state,
        rmData: action.payload,
      };
		},
		
	},
};

export default Model;