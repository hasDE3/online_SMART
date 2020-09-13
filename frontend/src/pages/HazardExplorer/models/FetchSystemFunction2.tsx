/**
 * System Function Model
 */

import { Effect, Reducer } from 'umi';
import { SystemFunctionItemType } from '../data';
import { querySystemFunction } from '../service';


/** Hazard Instance */

export interface FetchSystemFunctionState {
	sfData: SystemFunctionItemType[];
}

export interface ModelType {
	namespace: string;
	state: FetchSystemFunctionState;
	effects: {
		fetchSystemFunction: Effect;

	};
	reducers: {
		fetchSystemFunctionReducer: Reducer<FetchSystemFunctionState>;
	};
}

const Model: ModelType = {
	namespace: 'FetchSystemFunctionSpace',

	state: {
		sfData: [],
	},

	effects: {
		/** payload is the param transformed from the index.tsx */
		*fetchSystemFunction({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(querySystemFunction, payload);
			/**console.log(response.data)*/
			yield put({
				type: 'fetchSystemFunctionReducer',
				payload: response.data,
			});
    }
        
	},

	reducers: {
		fetchSystemFunctionReducer(state, action) {
			console.log(action.payload);
			return {
				...state,
				sfData: action.payload,
			};
		},
	},
};

export default Model;