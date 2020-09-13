import { ApplyPluginsType, dynamic } from '/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SMARTLayout' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/layouts/SMARTLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "path": "/",
        "redirect": "/home",
        "exact": true
      },
      {
        "path": "/home",
        "name": "dashboard",
        "icon": "Build",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/home'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      },
      {
        "name": "systemexplorer",
        "icon": "Windows",
        "path": "/SystemFunction",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SystemFunction' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/SystemFunction'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      },
      {
        "name": "careprocesseditor",
        "icon": "Partition",
        "path": "/CareProcessEditor",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CareProcessEditor' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/CareProcessEditor'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      },
      {
        "name": "caresettings",
        "icon": "Reconciliation",
        "path": "/caresettings",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CareSettings' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/CareSettings'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      },
      {
        "name": "riskmatrix",
        "icon": "Exception",
        "path": "/riskmatrix",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RiskMatrix' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/RiskMatrix'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      },
      {
        "name": "hazardexplorer",
        "icon": "FileSearch",
        "path": "/hazardexplorer",
        "routes": [
          {
            "path": "/hazardexplorer",
            "exact": true
          },
          {
            "name": "hazardlog",
            "path": "/hazardexplorer/list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__HazardExplorer' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/HazardExplorer'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "newhazardinstance",
            "path": "/hazardexplorer/new",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__NewHazardInstance' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/NewHazardInstance'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "edithazardinstance",
            "path": "/hazardexplorer/editor",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__EditHazardInstance' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/EditHazardInstance'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "causeeffect",
            "path": "/hazardexplorer/causeeffect",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CauseEffect' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/CauseEffect'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          }
        ]
      },
      {
        "name": "issuelog",
        "icon": "IssuesClose",
        "path": "/issuelog2",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__IssueLog2' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/IssueLog2'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      },
      {
        "name": "report",
        "icon": "Form",
        "path": "/report2",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Report2' */'/Users/zheyu/Workspace/02_COURSEWORK/smart/frontend/src/pages/Report2'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
