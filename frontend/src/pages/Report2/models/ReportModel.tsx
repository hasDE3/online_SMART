import { Effect, Reducer } from 'umi';
import { ReportItemType } from '../data';
import { queryReport, addReport, updateReport, removeReport } from '../service';

/** Hazard Type */

export interface ReportState {
	reData: ReportItemType[];
}

export interface ModelType {
	namespace: string;
	state: ReportState;
	effects: {
        fetchReport: Effect;
        addReport: Effect;
        updateReport: Effect;
        removeReport: Effect;
	};
	reducers: {
        fetchReportReducer: Reducer<ReportState>;
	};
}

const Model: ModelType = {
	namespace: 'ReportSpace',

	state: {
		reData: [],
	},

	effects: {
		/** payload is the param transformed from the index.tsx */
		*fetchReport({ payload }, { call, put }) {
			/** Get current state */
			const response = yield call(queryReport, payload);
			/**console.log(response.data)*/
			yield put({
				type: 'fetchReportReducer',
				payload: response.data,
      });
      
      return response.data;
    },
        
		*addReport({ payload }, { call, put }) {
				let callback;
				callback = addReport;

				const response = yield call(callback, payload);
				yield put({
					type: 'fetchReportReducer',
					payload: response,
				});
    },

    *updateReport({ payload }, { call, put }) {
      let callback;
      callback = updateReport;

      const response = yield call(callback, payload);
      yield put({
        type: 'fetchReportReducer',
        payload: response,
      });
  },
	
			*removeReport({ payload }, { call, put }) {
				const callback = removeReport;
				
				const response = yield call(callback, payload);
				yield put({
					type: 'fetchReportReducer',
					payload: {response},
				});
		}
	},

	reducers: {
		fetchReportReducer(state, action) {
			return {
				/**...state,*/
				reData: action.payload,
			};
		},
	},
};

export default Model;