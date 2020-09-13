import request from 'umi-request';
import { RiskMatrixItemType, HazardInstanceItemType } from './data.d';

/** Fetch CSRF Token from the Backend Server
 *  Code from:
 *  https://docs.djangoproject.com/en/3.0/ref/csrf/
 *  Seems like it does not work with Charles
 */
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  // console.log(cookieValue);
  return cookieValue;
}
var csrftoken = getCookie('csrftoken');

/** Risk Matrix */
/** Fetch Risk Matrix */
export async function queryRiskMatrix(params?: RiskMatrixItemType) {
  return request('/api/listrm/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Risk Matrix */
export async function addRiskMatrix(params: RiskMatrixItemType) {
  return request('/api/addrm/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Risk Matrix */
export async function updateRiskMatrix(params: RiskMatrixItemType) {
  return request('/api/updaterm/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Risk Matrix */
export async function removeRiskMatrix(params: { pk: string[] }) {
  return request('/api/removerm/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** Hazard Instance - List */
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