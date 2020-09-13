import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'CauseEffectModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/models/CauseEffectModel.tsx').default) });
app.model({ namespace: 'global', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/models/global.ts').default) });
app.model({ namespace: 'login', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/models/login.ts').default) });
app.model({ namespace: 'setting', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/models/setting.ts').default) });
app.model({ namespace: 'user', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/models/user.ts').default) });
app.model({ namespace: 'CareProcessModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/CareProcessEditor/models/CareProcessModel.tsx').default) });
app.model({ namespace: 'EditHazardInstanceModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/EditHazardInstance/models/EditHazardInstanceModel.tsx').default) });
app.model({ namespace: 'FetchSingleHazardType', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/HazardExplorer/models/FetchSingleHazardType.tsx').default) });
app.model({ namespace: 'FetchSystemFunction2', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/HazardExplorer/models/FetchSystemFunction2.tsx').default) });
app.model({ namespace: 'HazardInstanceModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/HazardExplorer/models/HazardInstanceModel.tsx').default) });
app.model({ namespace: 'HazardTypeModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/HazardExplorer/models/HazardTypeModel.tsx').default) });
app.model({ namespace: 'DashboardModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/home/models/DashboardModel.tsx').default) });
app.model({ namespace: 'AddHazardInstanceModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/NewHazardInstance/models/AddHazardInstanceModel.tsx').default) });
app.model({ namespace: 'ReportModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/Report2/models/ReportModel.tsx').default) });
app.model({ namespace: 'RiskMatrixModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/RiskMatrix/models/RiskMatrixModel.tsx').default) });
app.model({ namespace: 'GetSystemDescription', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/SystemFunction/models/GetSystemDescription.tsx').default) });
app.model({ namespace: 'SystemFunction', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/SystemFunction/models/SystemFunction.ts').default) });
app.model({ namespace: 'SystemModel', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/SystemFunction/models/SystemModel.ts').default) });
app.model({ namespace: 'model', ...(require('/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/CareSettings/model.tsx').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
