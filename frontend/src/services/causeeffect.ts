import request from 'umi-request';

export interface CauseItemType {
  id: string;
  ca_name: string;
  ca_desc: string;
  ca_hi: string;
}

export interface EffectItemType {
  id: string;
  ef_name: string;
  ef_desc: string;
  ef_hi: string;
}

export interface CauseControlItemType {
  id: string;
  caco_name: string;
  caco_desc: string;
  caco_state: string;
  caco_type: string;
  caco_ca: string;
}

export interface EffectControlItemType {
  id: string;
  efco_name: string;
  efco_desc: string;
  efco_state: string;
  efco_type: string;
  efco_ef: string;
}

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

/** Effect Control*/
/** Fetch Effect Control */
export async function queryEffectControl(params?: EffectControlItemType) {
  return request('/api/listefco/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Effect Control */
export async function addEffectControl(params: EffectControlItemType) {
  return request('/api/addefco/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Effect Control */
export async function updateEffectControl(params: EffectControlItemType) {
  return request('/api/updateefco/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Effect Control */
export async function removeEffectControl(params: { pk: string[] }) {
  return request('/api/removeefco/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** Cause Control*/
/** Fetch Cause Control */
export async function queryCauseControl(params?: CauseControlItemType) {
  return request('/api/listcaco/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Cause Control */
export async function addCauseControl(params: CauseControlItemType) {
  return request('/api/addcaco/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Cause Control */
export async function updateCauseControl(params: CauseControlItemType) {
  return request('/api/updatecaco/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Cause Control */
export async function removeCauseControl(params: { pk: string[] }) {
  return request('/api/removecaco/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** Effect*/
/** Fetch Effect */
export async function queryEffect(params?: EffectItemType) {
  return request('/api/listef/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Effect */
export async function addEffect(params: EffectItemType) {
  return request('/api/addef/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Effect */
export async function updateEffect(params: EffectItemType) {
  return request('/api/updateef/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Effect */
export async function removeEffect(params: { pk: string[] }) {
  return request('/api/removeef/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** Cause*/
/** Fetch Cause */
export async function queryCause(params?: CauseItemType) {
  return request('/api/listca/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Cause */
export async function addCause(params: CauseItemType) {
  return request('/api/addca/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Cause */
export async function updateCause(params: CauseItemType) {
  return request('/api/updateca/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Cause */
export async function removeCause(params: { pk: string[] }) {
  return request('/api/removeca/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}