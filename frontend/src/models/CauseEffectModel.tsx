import { Effect, Reducer } from 'umi';
import { CauseControlItemType, CauseItemType, EffectControlItemType, EffectItemType,
queryCause, queryCauseControl, queryEffect, queryEffectControl,
addCause, addCauseControl, addEffect, addEffectControl,
updateCause, updateCauseControl, updateEffect, updateEffectControl,
removeCause, removeCauseControl, removeEffect, removeEffectControl } from '../services/causeeffect';

/** Cause Effect */

export interface CauseEffectState {
  caData?: CauseItemType[];
  efData?: EffectItemType[];
  cacoData?: CauseControlItemType[];
  efcoData?: EffectControlItemType[];
}

export interface ModelType {
	namespace: string;
	state: CauseEffectState;
	effects: {
    fetchCause: Effect;
    submitCause: Effect;    
    removeCause: Effect;

    fetchEffect: Effect;
    submitEffect: Effect;
    removeEffect: Effect;

    fetchCauseControl: Effect;
    submitCauseControl: Effect;
    removeCauseControl: Effect;

    fetchEffectControl: Effect;
    removeEffectControl: Effect;
    submitEffectControl: Effect;    

	};
	reducers: {
    fetchCauseReducer: Reducer<CauseEffectState>;
    fetchEffectReducer: Reducer<CauseEffectState>;
    fetchCauseControlReducer: Reducer<CauseEffectState>;
    fetchEffectControlReducer: Reducer<CauseEffectState>;
	};
}

const Model: ModelType = {
	namespace: 'CauseEffectSpace',

	state: {
    caData: [],
    efData: [],
    cacoData: [],
    efcoData: [],
	},

	effects: {		
		*fetchCause({ payload }, { call, put }) {
			const response = yield call(queryCause, payload);
			yield put({
				type: 'fetchCauseReducer',
				payload: response.data,
      });
      return response.data
    },
        
		*submitCause({ payload }, { call, put }) {
      let callback;	
      if (payload.id) {
        callback = updateCause;
      } else {
        callback = addCause;
      }
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchCauseReducer',
        payload: response,
      });
    },

    *removeCause({ payload }, { call, put }) {
      const callback = removeCause;    
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchCauseReducer',
        payload: {response},
      });
    },
    
		*fetchEffect({ payload }, { call, put }) {
			const response = yield call(queryEffect, payload);
			yield put({
				type: 'fetchEffectReducer',
				payload: response.data,
      });
      return response.data
    },
        
		*submitEffect({ payload }, { call, put }) {
      let callback;	
      if (payload.id) {
        callback = updateEffect;
      } else {
        callback = addEffect;
      }
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchEffectReducer',
        payload: response,
      });
    },

    *removeEffect({ payload }, { call, put }) {
      const callback = removeEffect;    
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchEffectReducer',
        payload: {response},
      });
    },

		*fetchEffectControl({ payload }, { call, put }) {			
			const response = yield call(queryEffectControl, payload);			
			yield put({
				type: 'fetchEffectControlReducer',
				payload: response.data,
      });
      return response.data
    },
    
    *submitEffectControl({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = updateEffectControl;
      } else {
        callback = addEffectControl;
      }      
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchEffectControlReducer',
        payload: response,
      });
    },

    *removeEffectControl({ payload }, { call, put }) {
      const callback = removeEffectControl;    
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchEffectControlReducer',
        payload: {response},
      });
    },

		*fetchCauseControl({ payload }, { call, put }) {			
			const response = yield call(queryCauseControl, payload);			
			yield put({
				type: 'fetchCauseControlReducer',
				payload: response.data,
      });
      return response.data
    },
        
		*submitCauseControl({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = updateCauseControl;
      } else {
        callback = addCauseControl;
      }      
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchCauseControlReducer',
        payload: response,
      });
    },
    

    *removeCauseControl({ payload }, { call, put }) {
      const callback = removeCauseControl;    
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchCauseControlReducer',
        payload: {response},
      });
    },

	},

	reducers: {
		fetchCauseReducer(state, action) {
			return {
				...state,
				caData: action.payload,
			};
    },
    
    fetchCauseControlReducer(state, action) {
			return {
				...state,
				cacoData: action.payload,
			};
    },
    
    fetchEffectReducer(state, action) {
			return {
				...state,
				efData: action.payload,
			};
    },
    
    fetchEffectControlReducer(state, action) {
			return {
				...state,
				efcoData: action.payload,
			};
		},
	},
};

export default Model;