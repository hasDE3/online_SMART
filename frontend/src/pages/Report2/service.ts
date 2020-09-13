import request from 'umi-request';
import { ReportItemType } from './data.d';

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

/** Report */
/** Fetch Report */
export async function queryReport(params?: ReportItemType) {
  return request('/api/listre/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Report */
export async function addReport(params: ReportItemType) {
  return request('/api/addre/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Report */
export async function updateReport(params: ReportItemType) {
  return request('/api/updatere/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Report */
export async function removeReport(params: { pk: string[] }) {
  return request('/api/removere/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}
