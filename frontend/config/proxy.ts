/**
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // The backend is running in 9000 port
    // Please use the following command to run the backend
    // 'python3 manage.py runserver 9000'
    '/api': { 
      target: 'http://localhost:9000',
      changeOrigin: true,
      pathRewrite: {'^' : ''},
    }
  },
};
