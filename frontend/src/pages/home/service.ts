import request from 'umi-request';
import { SystemFunctionItemType, SystemItemType, HazardInstanceItemType, HazardTypeItemType,
          CareSettingItemType, ProcessSystemItemType, RiskMatrixItemType } from './data.d';

/** Fetch CSRF Token from the Backend Server
 *  Code from:
 *  https://docs.djangoproject.com/en/3.0/ref/csrf/
 *  Seems like it does not work with Charles 
 */
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  console.log(cookieValue);
  return cookieValue;
}
let csrftoken = getCookie('csrftoken');

/** Fetch System */
export async function querySystem(params?: SystemItemType) {
  return request('/api/listsy/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Fetch System Function */
export async function querySystemFunction(params: SystemFunctionItemType) {
  return request('/api/listsf/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Fetch Hazard Type */
export async function queryHazardType(params?: HazardTypeItemType) {
  return request('/api/listht/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Fetch Hazard Instance */
export async function queryHazardInstance(params: HazardInstanceItemType) {
  return request('/api/listhi/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

// Fetch Care Setting
// ************************
export async function queryCareSetting(params?: CareSettingItemType) {
  return request('/api/listcs/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
    //data: {params,}
  });
}

/** Fetch Process System */
export async function queryProcessSystem(params?: ProcessSystemItemType) {
  return request('/api/listps/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Fetch Risk Matrix */
export async function queryRiskMatrix(params?: RiskMatrixItemType) {
  return request('/api/listrm/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}