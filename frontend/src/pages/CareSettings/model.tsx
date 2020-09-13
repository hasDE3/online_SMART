import { Effect, Reducer } from 'umi';
import { ProcessNodeItemType } from './data';
import { updateProcessNode } from './service';

export interface CareSettingPNState {
  pnData?: ProcessNodeItemType[];
}

export interface ModelType {
  namespace: string;
  state: CareSettingPNState;
  effects: {
    updateProcessNodeCS: Effect;

  };
  reducers: {
    fetchProcessNodeReducer: Reducer<CareSettingPNState>;
  };
}

const Model: ModelType = {
  namespace: 'CareSettingPNSpace',

  state: {
    pnData: [],
  },

  effects: {
    * updateProcessNodeCS({ payload }, { call, put }) {
      let callback;

      callback = updateProcessNode;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNodeReducer',
        payload: response,
      });
    },
  },

  reducers: {
    fetchProcessNodeReducer(state, action) {
      return {
        ...state,
        pnData: action.payload,
      };
    },
  },
};

export default Model;
