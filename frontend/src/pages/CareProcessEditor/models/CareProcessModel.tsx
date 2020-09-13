/**
 * Model for Care Process Editor
 * Handle for Process System, Process Node, Process Edge, Hazard Instance, System Function, Process Group
 */

import { Effect, Reducer } from 'umi';
import { ProcessSystemItemType, ProcessEdgeItemType, ProcessNodeItemType, CareSettingItemType,
         SystemFunctionItemType, HazardInstanceItemType, ProcessNode_HazardInstanceItemType, ProcessNode_SystemFunctionItemType,
        NodeGroupItemType } from '../data';
import { queryProcessSystem, updateProcessSystem, removeProcessSystem, addProcessSystem,
        queryProcessEdge, updateProcessEdge, removeProcessEdge, addProcessEdge,
        queryProcessNode, updateProcessNode, removeProcessNode, addProcessNode, queryCareSetting,
        queryHazardInstance, querySystemFunction,
        queryProcessNode_SystemFunction, addProcessNode_SystemFunction, updateProcessNode_SystemFunction, removeProcessNode_SystemFunction,
        queryProcessNode_HazardInstance, addProcessNode_HazardInstance, updateProcessNode_HazardInstance, removeProcessNode_HazardInstance,
        queryNodeGroup, addNodeGroup, updateNodeGroup, removeNodeGroup } from '../service';


export interface CareProcessState {
  psData?: ProcessSystemItemType[];
  spsData?: ProcessSystemItemType[];
  peData?: ProcessEdgeItemType[];
  pnData?: ProcessNodeItemType[];
  csData?: CareSettingItemType[];
  sfData?: SystemFunctionItemType[];
  hiData?: HazardInstanceItemType[];
  pnsfData?: ProcessNode_SystemFunctionItemType[];
  pnhiData?: ProcessNode_HazardInstanceItemType[];
  ngData?: NodeGroupItemType[];
}

export interface ModelType {
	namespace: string;
	state: CareProcessState;
	effects: {

    fetchNodeGroup: Effect;
    submitNodeGroup: Effect;
    removeNodeGroup: Effect;
    updateNodeGroup: Effect;

    fetchProcessSystem: Effect;
    fetchSingleProcessSystem: Effect;
    submitProcessSystem: Effect;
    removeProcessSystem: Effect;

    fetchProcessEdge: Effect;
    submitProcessEdge: Effect;
    removeProcessEdge: Effect;
    updateProcessEdge: Effect;

    fetchProcessNode: Effect;
    submitProcessNode: Effect;
    removeProcessNode: Effect;
    updateProcessNode: Effect;

    fetchProcessNode_SystemFunction: Effect;
    submitProcessNode_SystemFunction: Effect;
    removeProcessNode_SystemFunction: Effect;

    fetchProcessNode_HazardInstance: Effect;
    submitProcessNode_HazardInstance: Effect;
    removeProcessNode_HazardInstance: Effect;

    fetchCareSetting: Effect;
    fetchSystemFunction: Effect;
    fetchHazardInstance: Effect;
	};
	reducers: {
    fetchNodeGroupReducer: Reducer<CareProcessState>;
    fetchProcessSystemReducer: Reducer<CareProcessState>;
    fetchSingleProcessSystemReducer: Reducer<CareProcessState>;
    fetchProcessEdgeReducer: Reducer<CareProcessState>;
    fetchProcessNodeReducer: Reducer<CareProcessState>;
    fetchCareSettingReducer: Reducer<CareProcessState>;
    fetchSystemFunctionReducer: Reducer<CareProcessState>;
    fetchHazardInstanceReducer: Reducer<CareProcessState>;
    fetchProcessNode_SystemFunctionReducer: Reducer<CareProcessState>;
    fetchProcessNode_HazardInstanceReducer: Reducer<CareProcessState>;
    clear: Reducer<CareProcessState>;
	};
}

const Model: ModelType = {
	namespace: 'CareProcessSpace',

	state: {
    psData: [],
    //spsData: [],
    peData: [],
    pnData: [],
    csData: [],
    pnsfData: [],
    sfData: [],
    pnhiData: [],
    ngData: [],
	},

	effects: {
	  /** ProcessNode HazardInstance
     *
     * */
    *fetchProcessNode_HazardInstance({ payload }, { call, put }) {
      const response = yield call(queryProcessNode_HazardInstance, payload);
      yield put({
        type: 'fetchProcessNode_HazardInstanceReducer',
        payload: response.data,
      });
      return response.data
    },

    *submitProcessNode_HazardInstance({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = updateProcessNode_HazardInstance;
      } else {
        callback = addProcessNode_HazardInstance;
      }
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNode_HazardInstanceReducer',
        payload: response,
      });
    },

    *removeProcessNode_HazardInstance({ payload }, { call, put }) {
      const callback = removeProcessNode_HazardInstance;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNode_HazardInstanceReducer',
        payload: {response},
      });
    },

    /** ProcessNode System Function
     *
     * */
    *fetchProcessNode_SystemFunction({ payload }, { call, put }) {
			const response = yield call(queryProcessNode_SystemFunction, payload);
			yield put({
				type: 'fetchProcessNode_SystemFunctionReducer',
				payload: response.data,
      });
      return response.data
    },

    *submitProcessNode_SystemFunction({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = updateProcessNode_SystemFunction;
      } else {
        callback = addProcessNode_SystemFunction;
      }
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNode_SystemFunctionReducer',
        payload: response,
      });
    },

    *removeProcessNode_SystemFunction({ payload }, { call, put }) {
      const callback = removeProcessNode_SystemFunction;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNode_SystemFunctionReducer',
        payload: {response},
      });
    },

    /** ------------------------------ */

    *fetchSingleProcessSystem({ payload }, { call, put }) {
			const response = yield call(queryProcessSystem, payload);
			yield put({
				type: 'fetchSingleProcessSystemReducer',
				payload: response.data,
			});
    },

		*fetchProcessSystem({ payload }, { call, put }) {
			const response = yield call(queryProcessSystem, payload);
			yield put({
				type: 'fetchProcessSystemReducer',
				payload: response.data,
      });
      return response.data
    },

    *submitProcessSystem({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = updateProcessSystem;
      } else {
        callback = addProcessSystem;
      }
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessSystemReducer',
        payload: response,
      });
    },

    *removeProcessSystem({ payload }, { call, put }) {
      const callback = removeProcessSystem;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessSystemReducer',
        payload: {response},
      });
    },

		*fetchProcessEdge({ payload }, { call, put }) {
			const response = yield call(queryProcessEdge, payload);
			yield put({
				type: 'fetchProcessEdgeReducer',
				payload: response.data,
      });
      return response.data
    },

    *submitProcessEdge({ payload }, { call, put }) {
      let callback;

      callback = addProcessEdge;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessEdgeReducer',
        payload: response,
      });
    },

    *removeProcessEdge({ payload }, { call, put }) {
      const callback = removeProcessEdge;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessEdgeReducer',
        payload: {response},
      });
    },

    *fetchProcessNode({ payload }, { call, put }) {
			const response = yield call(queryProcessNode, payload);
			yield put({
				type: 'fetchProcessNodeReducer',
				payload: response.data,
      });
      return response.data
    },

    *submitProcessNode({ payload }, { call, put }) {
      let callback;

      callback = addProcessNode;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNodeReducer',
        payload: response,
      });
    },

    *removeProcessNode({ payload }, { call, put }) {
      const callback = removeProcessNode;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNodeReducer',
        payload: {response},
      });
    },

    *updateProcessNode({ payload }, { call, put }) {
      let callback;
      callback = updateProcessNode;
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessNodeReducer',
        payload: response,
      });
    },

    *fetchNodeGroup({ payload }, { call, put }) {
			const response = yield call(queryNodeGroup, payload);
			yield put({
				type: 'fetchNodeGroupReducer',
				payload: response.data,
      });
      return response.data
    },

    *submitNodeGroup({ payload }, { call, put }) {
      let callback;

      callback = addNodeGroup;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchNodeGroupReducer',
        payload: response,
      });
    },

    *removeNodeGroup({ payload }, { call, put }) {
      const callback = removeNodeGroup;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchNodeGroupReducer',
        payload: {response},
      });
    },

    *updateNodeGroup({ payload }, { call, put }) {
      let callback;
      callback = updateNodeGroup;
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchNodeGroupReducer',
        payload: response,
      });
    },

    *updateProcessEdge({ payload }, { call, put }) {
      let callback;
      callback = updateProcessEdge;
      const response = yield call(callback, payload);
      yield put({
        type: 'fetchProcessEdgeReducer',
        payload: response,
      });
    },

    *fetchCareSetting({ payload }, { call, put }) {
			const response = yield call(queryCareSetting, payload);
			yield put({
				type: 'fetchCareSettingReducer',
				payload: response.data,
      });
      return response.data
    },

    *fetchSystemFunction({ payload }, { call, put }) {
			const response = yield call(querySystemFunction, payload);
			yield put({
				type: 'fetchSystemFunctionReducer',
				payload: response.data,
      });
      return response.data
    },

    *fetchHazardInstance({ payload }, { call, put }) {
			const response = yield call(queryHazardInstance, payload);
			yield put({
				type: 'fetchHazardInstanceReducer',
				payload: response.data,
      });
      return response.data
    },

  },

	reducers: {
    fetchProcessEdgeReducer(state, action) {
			return {
				...state,
				peData: action.payload,
			};
    },
		fetchProcessSystemReducer(state, action) {
			return {
				...state,
				psData: action.payload,
			};
    },
    fetchSingleProcessSystemReducer(state, action) {
			return {
				...state,
				spsData: action.payload,
			};
    },

    fetchProcessNodeReducer(state, action) {
			return {
				...state,
				pnData: action.payload,
			};
    },

    fetchCareSettingReducer(state, action) {
			return {
				...state,
				csData: action.payload,
			};
    },

    fetchSystemFunctionReducer(state, action) {
			return {
				...state,
				sfData: action.payload,
			};
    },

    fetchHazardInstanceReducer(state, action) {
			return {
				...state,
				hiData: action.payload,
			};
    },

    fetchProcessNode_SystemFunctionReducer(state, action) {
			return {
				...state,
				pnsfData: action.payload,
			};
    },

    fetchProcessNode_HazardInstanceReducer(state, action) {
      return {
        ...state,
        pnhiData: action.payload,
      };
    },

    fetchNodeGroupReducer(state, action) {
      return {
        ...state,
        ngData: action.payload,
      };
    },

    clear() {
      return {
        psData: [],
        spsData: [],
        peData: [],
        pnData: [],
        pnhiData: [],
        pnsfData: [],
        ngData: [],
      };
    },

	},
};

export default Model;
