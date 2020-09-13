/**
 * Hazard Instance Model
 */

import { Effect, Reducer } from 'umi';
import { HazardInstanceItemType } from '../data';
import { queryHazardInstance, addHazardInstance, updateHazardInstance,
  removeHazardInstance } from '../service';

/** Hazard Instance */

export interface HazardInstanceState {
	hiData: HazardInstanceItemType[];
}

export interface ModelType {
	namespace: string;
	state: HazardInstanceState;
	effects: {
		fetchHazardInstance: Effect;
		submitHazardInstance: Effect;
		removeHazardInstance: Effect;
	};
	reducers: {
		fetchHazardInstanceReducer: Reducer<HazardInstanceState>;
	};
}

const Model: ModelType = {
	namespace: 'HazardInstanceSpace',

	state: {
		hiData: [],
	},

	effects: {

		/** payload is the param transformed from the index.tsx */
		*fetchHazardInstance({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(queryHazardInstance, payload);
			// console.log(response.data)
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

		*removeHazardInstance({ payload }, { call, put }) {
			const callback = removeHazardInstance;

			const response = yield call(callback, payload);
			yield put({
				type: 'fetchHazardInstanceReducer',
				payload: {response},
			});
		}
	},

	reducers: {
		fetchHazardInstanceReducer(state, action) {
			return {
				/**...state,*/
				hiData: action.payload,
			};
		},
	},
};

export default Model;
