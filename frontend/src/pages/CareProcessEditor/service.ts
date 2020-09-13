import request from 'umi-request';
import { ProcessEdgeItemType, ProcessNodeItemType, ProcessSystemItemType,
         CareSettingItemType, SystemFunctionItemType, HazardInstanceItemType,
         ProcessNode_HazardInstanceItemType, ProcessNode_SystemFunctionItemType,
         NodeGroupItemType } from './data';

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

/** --------------------------------------------------------------------------------------- */

// Add System Function
// Added 18/08/2020
// After evaluation
// ****************
export async function addSystemFunction(params: SystemFunctionItemType) {
  return request('/api/addsf/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
      //method: 'post',
    },
  });
}

/** Node Group */
/** Fetch Node Group*/
export async function queryNodeGroup(params?: NodeGroupItemType) {
  return request('/api/listng/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Node Group */
export async function addNodeGroup(params: NodeGroupItemType) {
  return request('/api/addng/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Node Group */
export async function updateNodeGroup(params: NodeGroupItemType) {
  return request('/api/updateng/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Node Group */
export async function removeNodeGroup(params: { id: string[] }) {
  return request('/api/removeng/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** --------------------------------------------------------------------------------------- */

/** Process Node */
/** Fetch Process Node */
export async function queryProcessNode(params?: ProcessNodeItemType) {
  return request('/api/listpn/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Process Node */
export async function addProcessNode(params: ProcessNodeItemType) {
  return request('/api/addpn/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Process Node */
export async function updateProcessNode(params: ProcessNodeItemType) {
  return request('/api/updatepn/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Process Node */
export async function removeProcessNode(params: { id: string[] }) {
  return request('/api/removepn/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** --------------------------------------------------------------------------------------- */

/** Process Edge */
/** Fetch Process Edge */
export async function queryProcessEdge(params?: ProcessEdgeItemType) {
  return request('/api/listpe/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Process Edge */
export async function addProcessEdge(params: ProcessEdgeItemType) {
  return request('/api/addpe/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Process Edge */
export async function updateProcessEdge(params: ProcessEdgeItemType) {
  return request('/api/updatepe/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Process Edge */
export async function removeProcessEdge(params: { pk: string[] }) {
  return request('/api/removepe/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** --------------------------------------------------------------------------------------- */

/** Process System */
/** Fetch Process System */
export async function queryProcessSystem(params?: ProcessSystemItemType) {
  return request('/api/listps/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add Process System */
export async function addProcessSystem(params: ProcessSystemItemType) {
  return request('/api/addps/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update Process System */
export async function updateProcessSystem(params: ProcessSystemItemType) {
  return request('/api/updateps/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove Process System */
export async function removeProcessSystem(params: { pk: string[] }) {
  return request('/api/removeps/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}



/** Process Node <=> System Function */
/** Fetch ProcessNode_SystemFunction */
export async function queryProcessNode_SystemFunction(params?: ProcessNode_SystemFunctionItemType) {
  return request('/api/listpnsf/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add ProcessNode_SystemFunction */
export async function addProcessNode_SystemFunction(params: ProcessNode_SystemFunctionItemType) {
  return request('/api/addpnsf/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update ProcessNode_SystemFunction */
export async function updateProcessNode_SystemFunction(params: ProcessNode_SystemFunctionItemType) {
  return request('/api/updatepnsf/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove ProcessNode_SystemFunction */
export async function removeProcessNode_SystemFunction(params: { pk: string[] }) {
  return request('/api/removepnsf/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}


/** Process Node <=> Hazard Instance */
/** Fetch ProcessNode_HazardInstance */
export async function queryProcessNode_HazardInstance(params?: ProcessNode_HazardInstanceItemType) {
  return request('/api/listpnhi/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
  });
}

/** Add ProcessNode_HazardInstance */
export async function addProcessNode_HazardInstance(params: ProcessNode_HazardInstanceItemType) {
  return request('/api/addpnhi/', {
    method: 'POST',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Update ProcessNode_HazardInstance
 *  Actually the update function is never used in this program
 *  But it is still included here
 *  So is the updateProcessNode_SystemFunction
 * */
export async function updateProcessNode_HazardInstance(params: ProcessNode_HazardInstanceItemType) {
  return request('/api/updatepnhi/', {
    method: 'PATCH',
    headers: { "X-CSRFToken": csrftoken },
    data: {
      ...params,
    },
  });
}

/** Remove ProcessNode_HazardInstance */
export async function removeProcessNode_HazardInstance(params: { pk: string[] }) {
  return request('/api/removepnhi/', {
    method: 'DELETE',
    headers: { "X-CSRFToken": csrftoken },
    params: params,
  });
}

/** ------------------------------
 * Other services
 */
/** Fetch Care Setting */
export async function queryCareSetting(params: CareSettingItemType) {
  return request('/api/listcs/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
    //data: {params,}
  });
}

export async function querySystemFunction(params: SystemFunctionItemType) {
  return request('/api/listsf/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
    //data: {params,}
  });
}

export async function queryHazardInstance(params: HazardInstanceItemType) {
  return request('/api/listhi/', {
    method: 'GET',
    headers: { "X-CSRFToken": csrftoken },
    params,
    //data: {params,}
  });
}
