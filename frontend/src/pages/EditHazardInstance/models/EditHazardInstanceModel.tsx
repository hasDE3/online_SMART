import { Effect, Reducer } from 'umi';
import { HazardInstanceItemType, SystemFunctionItemType, HazardTypeItemType, RiskMatrixItemType } from '../data';
import { queryHazardInstance, updateHazardInstance, querySystemFunction, queryHazardType, queryRiskMatrix } from '../service';

/** Hazard Instance */

export interface EditHazardInstanceState {
	hiData?: HazardInstanceItemType[];
	sfData?: SystemFunctionItemType[];
	htData?: HazardTypeItemType[];
	rmData?: RiskMatrixItemType[];
}

export interface ModelType {
	namespace: string;
	state: EditHazardInstanceState;
	effects: {
		fetchHazardInstance: Effect;
		submitHazardInstance: Effect;

		fetchSystemFunction: Effect;
		fetchHazardType: Effect;

		fetchRiskMatrix: Effect;

	};
	reducers: {
		fetchRiskMatrixReducer: Reducer<EditHazardInstanceState>;
		fetchHazardInstanceReducer: Reducer<EditHazardInstanceState>;
		fetchSystemFunctionReducer: Reducer<EditHazardInstanceState>;
		fetchHazardTypeReducer: Reducer<EditHazardInstanceState>;
	};
}

const Model: ModelType = {
	namespace: 'EditHazardInstanceSpace',

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
			/** console.log(response.data)*/
			yield put({
				type: 'fetchHazardInstanceReducer',
				payload: response.data,
			});
			/** The returned data is used to fetch the requested Hazard Instance data */
			return response.data
    },

		*submitHazardInstance({ payload }, { call, put }) {
			let callback = updateHazardInstance;
			const response = yield call(callback, payload);
			yield put({
				type: 'fetchHazardInstanceReducer',
				payload: response,
			});
	},


		*fetchSystemFunction({ payload }, { call, put }) {
      /** Get current state */
      const response = yield call(querySystemFunction, payload);
      /** console.log(response.data)*/
      yield put({
        type: 'fetchSystemFunctionReducer',
        payload: response.data,
      });
      return response.data
		},

		*fetchHazardType({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(queryHazardType, payload);
			/** console.log(response.data)*/
			yield put({
				type: 'fetchHazardTypeReducer',
				payload: response.data,
			});
    },


	},

	reducers: {

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
