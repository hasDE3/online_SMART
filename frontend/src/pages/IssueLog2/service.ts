import request from 'umi-request';
import { TableListParams } from './data.d';

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

// Fetch Items from the Database
// ************************
export async function queryItem(params?: TableListParams) {
  return request('/api/listil', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
    //data: {params,}
  });
}

// Delete Item
export async function removeItem(params: { pk: number[] }) {
  return request('/api/removeil', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

// Add Item
export async function addItem(params: TableListParams) {
  return request('/api/addil/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

// Update Item
export async function updateItem(params: TableListParams) {
  return request('/api/updateil/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}
