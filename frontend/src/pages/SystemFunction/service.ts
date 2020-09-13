import request from 'umi-request';
import { ListItemDataType, MenuItemDataType } from './data.d';

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

/** System - Menu */
/** Fetch System */
export async function querySystem(params?: MenuItemDataType) {
  return request('/api/listsy', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add System */
export async function addSystem(params: MenuItemDataType) {
  return request('/api/addsy/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update System */
export async function updateSystem(params: MenuItemDataType) {
  return request('/api/updatesy/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove System */
export async function removeSystem(params: { pk: string[] }) {
  return request('/api/removesy/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** System Function - List */
/** Fetch System Function */
export async function querySystemFunction(params: ListItemDataType) {
  return request('/api/listsf', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add System Function */
export async function addSystemFunction(params: ListItemDataType) {
  return request('/api/addsf/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update System Function */
export async function updateSystemFunction(params: ListItemDataType) {
  return request('/api/updatesf/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove System Function */
export async function removeSystemFunction(params: { pk: string[] }) {
  return request('/api/removesf/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}