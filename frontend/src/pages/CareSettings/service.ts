import request from 'umi-request';
import { TableListParams, ProcessNodeItemType } from './data.d';

// Fetch CSRF Token from the Backend Server
// Code from:
// https://docs.djangoproject.com/en/3.0/ref/csrf/
// Seems like it does not work with Charles
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


/** Update Associated Process Node */
export async function updateProcessNode(params: ProcessNodeItemType) {
  return request('/api/removepncs/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

// Fetch Care Setting
// ************************
export async function queryItem(params?: TableListParams) {
  return request('/api/listcs/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
    //data: {params,}
  });
}

// Remove Item
// ****************
export async function removeItem(params: { pk: string[] }) {
  return request('/api/removecs/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
    //data: {
      //...params,
      //method: 'delete',
    //},
  });
}

// Add Item
// ****************
export async function addItem(params: TableListParams) {
  return request('/api/addcs/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
      //method: 'post',
    },
  });
}

// Update Item
// ******************
export async function updateItem(params: TableListParams) {
  return request('/api/updatecs/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    //params: Object.keys(params),
    //headers: { "X-CSRFToken": c_token },
    data: {
      ...params,
      //method: 'update',
    },
  });
}
