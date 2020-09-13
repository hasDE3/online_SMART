import { Effect, Reducer } from 'umi';
import { ListItemDataType } from '../data';
import { querySystemFunction, addSystemFunction, updateSystemFunction, removeSystemFunction } from '../service';

/** List = System Function */


export interface ListState {
  listData: ListItemDataType[];  
}

export interface ModelType {
  namespace: string;
  state: ListState;
  effects: {
    fetchList: Effect;
    submitList: Effect;
    removeList: Effect;
  };
  reducers: {
    queryList: Reducer<ListState>;
  };
}

const Model: ModelType = {
  namespace: 'SystemSpace',

  state: {
    listData: [],
  },

  effects: {
    /** payload is the param transformed from the index.tsx */
    *fetchList({ payload }, { call, put }) {
      /** Get current state */
      const response = yield call(querySystemFunction, payload);
      /**console.log(response.data)*/
      yield put({
        type: 'queryList',
        payload: response.data,
      });
    },

    *submitList({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = updateSystemFunction;
      } else {
        callback = addSystemFunction;
      }      
      const response = yield call(callback, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },

    *removeList({ payload }, { call, put }) {
      const callback = removeSystemFunction;
      
      const response = yield call(callback, payload);
      yield put({
        type: 'queryList',
        payload: {response},
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        /**...state,*/
        listData: action.payload,
      };
    },
  },
};

export default Model;
