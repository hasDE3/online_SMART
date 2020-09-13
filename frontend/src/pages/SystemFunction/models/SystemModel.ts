import { Effect, Reducer } from 'umi';
import { MenuItemDataType } from '../data';
import { querySystem } from '../service';

/** Menu = System */

export interface MenuState {
	menuData: MenuItemDataType[];
}

export interface ModelType {
	namespace: string;
	state: MenuState;
	effects: {
		fetchMenu: Effect;
	};
	reducers: {
		queryMenu: Reducer<MenuState>;
	};
}

const Model: ModelType = {
	namespace: 'MenuSpace',

	state: {
		menuData: [],
	},

	effects: {
		/** payload is the param transformed from the index.tsx */
		*fetchMenu({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(querySystem, payload);
			/**console.log(response.data)*/
			yield put({
				type: 'queryMenu',
				payload: response.data,
			});

			return response.data;
		},
	},

	reducers: {
		queryMenu(state, action) {
			return {
				/**...state,*/
				menuData: action.payload,
			};
		},
	},
};

export default Model;