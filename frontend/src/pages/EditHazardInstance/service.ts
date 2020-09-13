import request from 'umi-request';
import { HazardInstanceItemType, HazardTypeItemType, SystemFunctionItemType, SystemItemType,
        RiskMatrixItemType } from './data.d';

/** Fetch CSRF Token from the Backend Server
 *  Code from:
 *  https://docs.djangoproject.com/en/3.0/ref/csrf/
 *  Seems like it does not work with Charles
 */
function getCookie(name) {
  var cookieValue = null;
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
var csrftoken = getCookie('csrftoken');

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

/** Update Hazard Instance */
export async function updateHazardInstance(params: HazardInstanceItemType) {
  return request('/api/updatehi/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Risk Matrix */
/** Fetch Risk Matrix */
export async function queryRiskMatrix(params?: RiskMatrixItemType) {
  return request('/api/listrm/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}