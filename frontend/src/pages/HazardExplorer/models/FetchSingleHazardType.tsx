/**
 * Hazard Type Description Model
 */

import { Effect, Reducer } from 'umi';
import { HazardTypeItemType } from '../data';
import { queryHazardType } from '../service';

/** Hazard Type */

export interface SingleHazardTypeState {
	shtData: HazardTypeItemType[];
}

export interface ModelType {
	namespace: string;
	state: SingleHazardTypeState;
	effects: {
        fetchSingleHazardType: Effect;
	};
	reducers: {
        fetchSingleHazardTypeReducer: Reducer<SingleHazardTypeState>;
	};
}

const Model: ModelType = {
	namespace: 'SingleHazardTypeSpace',

	state: {
		shtData: [],
	},

	effects: {
		*fetchSingleHazardType({ payload }, { call, put }) {
			const response = yield call(queryHazardType, payload);
			yield put({
				type: 'fetchSingleHazardTypeReducer',
				payload: response.data,
			});
        },
	},

	reducers: {
		fetchSingleHazardTypeReducer(state, action) {
			return {
				shtData: action.payload,
			};
		},
	},
};

export default Model;