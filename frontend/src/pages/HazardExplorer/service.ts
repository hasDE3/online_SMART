import request from 'umi-request';
import { HazardInstanceItemType, HazardTypeItemType } from './data.d';

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

/** Hazard Type - Menu */
/** Fetch Hazard Type */
export async function queryHazardType(params?: HazardTypeItemType) {
  return request('/api/listht/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Hazard Type */
export async function addHazardType(params: HazardTypeItemType) {
  return request('/api/addht/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Hazard Type */
export async function updateHazardType(params: HazardTypeItemType) {
  return request('/api/updateht/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove HazardType */
export async function removeHazardType(params: { pk: string[] }) {
  return request('/api/removeht/', {
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

/** Add Hazard Instance */
export async function addHazardInstance(params: HazardInstanceItemType) {
  return request('/api/addhi/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
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

/** Remove Hazard Instance */
export async function removeHazardInstance(params: { pk: string[] }) {
  return request('/api/removehi/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
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
