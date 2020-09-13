import { Effect, Reducer } from 'umi';
import { MenuItemDataType } from '../data';
import { querySystem } from '../service';

/** Menu = System */

export interface MenuDescriptionState {
	menuDescription: MenuItemDataType[];  
}

export interface ModelType {
	namespace: string;
	state: MenuDescriptionState;
	effects: {
		fetchMenuDescription: Effect;
	};
	reducers: {
		queryMenuDescription: Reducer<MenuDescriptionState>;
	};
}

const Model: ModelType = {
	namespace: 'MenuDescriptionSpace',

	state: {
		menuDescription: [],
	},

	effects: {

		*fetchMenuDescription({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(querySystem, payload);
			/**console.log(response.data)*/
			yield put({
				type: 'queryMenuDescription',
				payload: response.data,
			});
		},
	},

	reducers: {
		queryMenuDescription(state, action) {
			return {
				/**state,*/
				menuDescription: action.payload,
			};
		},
	},
};

export default Model;