// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {    
    default: 'en-US',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/SMARTLayout',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          name: 'dashboard',
          icon: 'Build',
          component: './home',
        },
        {
          name: 'systemexplorer',
          icon: 'Windows',
          path: '/SystemFunction',
          component: './SystemFunction',
        },
        {
          name: 'careprocesseditor',
          icon: 'Partition',
          path: '/CareProcessEditor',
          component: './CareProcessEditor',
        },
        {
          name: 'caresettings',
          icon: 'Reconciliation',
          path: '/caresettings',
          component: './CareSettings',
        },
        {
          name: 'riskmatrix',
          icon: 'Exception',
          path: '/riskmatrix',
          component: './RiskMatrix',
        },
        {
          name: 'hazardexplorer',
          icon: 'FileSearch',
          path: '/hazardexplorer',
          routes: [
            {
              path: '/hazardexplorer',
            },
            {
              name: 'hazardlog',
              path: '/hazardexplorer/list',
              component: './HazardExplorer',
            },
            {
              name: 'newhazardinstance',
              path: '/hazardexplorer/new',
              component: './NewHazardInstance',
            },
            {
              name: 'edithazardinstance',
              path: '/hazardexplorer/editor',
              component: './EditHazardInstance',
            },
            {
              name: 'causeeffect',
              path: '/hazardexplorer/causeeffect',
              component: './CauseEffect',
            },
          ],
        },
        {
          name: 'issuelog',
          icon: 'IssuesClose',
          path: '/issuelog2',
          component: './IssueLog2',
        },
        {
          name: 'report',
          icon: 'Form',
          path: '/report2',
          component: './Report2',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
});
