import { Effect, Reducer } from 'umi';
import { HazardTypeItemType } from '../data';
import { queryHazardType, addHazardType, updateHazardType, removeHazardType } from '../service';

/** 
 * Hazard Type Model 
 * 
*/

export interface HazardTypeState {
	htData: HazardTypeItemType[];
}

export interface ModelType {
	namespace: string;
	state: HazardTypeState;
	effects: {
        fetchHazardType: Effect;
        submitHazardType: Effect;
        removeHazardType: Effect;
	};
	reducers: {
        fetchHazardTypeReducer: Reducer<HazardTypeState>;
	};
}

const Model: ModelType = {
	namespace: 'HazardTypeSpace',

	state: {
		htData: [],
	},

	effects: {
		/** payload is the param transformed from the index.tsx */
		*fetchHazardType({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(queryHazardType, payload);
			/**console.log(response.data)*/
			yield put({
				type: 'fetchHazardTypeReducer',
				payload: response.data,
			});
    },
        
		*submitHazardType({ payload }, { call, put }) {
				let callback;
				if (payload.id) {
					callback = updateHazardType;
				} else {
					callback = addHazardType;
				}      
				const response = yield call(callback, payload);
				yield put({
					type: 'fetchHazardTypeReducer',
					payload: response,
				});
		},
	
			*removeHazardType({ payload }, { call, put }) {
				const callback = removeHazardType;
				
				const response = yield call(callback, payload);
				yield put({
					type: 'fetchHazardTypeReducer',
					payload: {response},
				});
		}
	},

	reducers: {
		fetchHazardTypeReducer(state, action) {
			return {
				/**...state,*/
				htData: action.payload,
			};
		},
	},
};

export default Model;