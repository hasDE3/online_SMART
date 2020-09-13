/** 
 * Using GGEditor 2.04 to achieve the flow chart function.
 * GGEditor on Github: https://github.com/alibaba/GGEditor/blob/master/README.en-US.md
 * 'SystemFunctionAssociation' and 'HazardInstanceAssociation' are used to handle the association function.
 * Flow component in GGEditor is used.
 * 
 */
import { Col, Row, Button, Descriptions, Card, Form, Popover, Select, Tabs, Input, Space, message } from 'antd';
import GGEditor, { Flow } from 'gg-editor';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { EditOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import React, { FC, useEffect, useState, useRef } from 'react';
import { connect, Dispatch } from 'umi';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowItemPanel } from './components/EditorItemPanel';
import StandardFormRow from './components/StandardFormRow';
import styles from './index.less';
import { findDOMNode } from 'react-dom';
import { ProcessEdgeItemType, ProcessNodeItemType, ProcessSystemItemType, CareSettingItemType, NodeGroupItemType } from './data';
import { CareProcessState } from '@/pages/CareProcessEditor/models/CareProcessModel';
import ProcessSystemAction from './components/StandardModal/ProcessSystemAction';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import SystemFunctionAssociation from './SystemFunctionAssociation';
import FlowConfiguration from './FlowConfiguration';
import HazardInstanceAssociation from '@/pages/CareProcessEditor/HazardInstanceAssociation';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;

/** FlowData is the whole flow chart data
 *  StepData is the data of the current selected node/edge
 */
let currentFlowData: {} = {
  nodes: [],
  edges: [],
  groups: [],
};

/** Used to store the process nodes/edges/systems data */
let nodesData: ProcessNodeItemType[] = [];
let edgesData: ProcessEdgeItemType[] = [];
let systemData: ProcessSystemItemType[] = [];
let groupsData: NodeGroupItemType[] = [];

let currentStepName: string = " ";
let currentStepID: string = "";
let currentSystemID: string = "default";

// Used for group actions
let currentNodeID: string = "";
let currentGroupID: string = "";

let currentNodeParent: string = "";

let currentSelect: string = "all";

// Disable GGEditor's Tracking
GGEditor.setTrackable(false);

interface ProcessEditorProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  CareProcessSpace: CareProcessState;
}

const ProcessEditor: React.FC<ProcessEditorProps> = ({
  dispatch,
  CareProcessSpace: { psData, spsData, peData, pnData, csData, ngData },
}) => {

  const [form] = Form.useForm();
  const { Option } = Select;
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<ProcessSystemItemType> | undefined>(undefined);
  const [descriptionDisable, setDescriptionDisable] = useState(true);
  const [newFlowData, setNewFlowData] = useState(false);

  const [, forceUpdate] = useState();

  // associationID is used to transform selected node ID to SystemFunctionAssociation/ HazardInstanceAssociation
  const [associationID, setAssociationID] = useState(currentStepID);
  const [nodeClick, setNodeClick] = useState(false);
  const [defaultActiveKey, setDefaultActivateKey] = useState("1");  

  // To disable 'edit' and 'remove' button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  /** Dva */
  useEffect(() => {
    if (currentSelect != "all") {
      setNewFlowData(true);
    }

    dispatch({
      type: 'CareProcessSpace/fetchProcessSystem',
      payload: {
      },
    }).then((data) => {
      systemData = data;
      // console.log(systemData);
    })
  }, []);

  useEffect(() => {
    if (currentSystemID != "default") {
      groupsData = [];
      dispatch({
        type: 'CareProcessSpace/fetchNodeGroup',
        payload: {
          ng_ps: currentSystemID,
        },
      }).then((data) => {                
        if (groupsData.length == 0) {
          for(let i: number = 0; i < data.length; i++) {
            groupsData.push(data[i]);
          }
        }
      })
    }

  }, []);

  useEffect(() => {
    // Fetch Care Setting
    // For the Care Setting Association
    dispatch({
      type: 'CareProcessSpace/fetchCareSetting',
      payload: {
      },
    }).then((data) => {
      // caresettingData = data;
      // console.log(caresettingData);
    })
  }, []);

  const FetchSingleProcessSystem = (pk: string) => {
    dispatch({
      type: 'CareProcessSpace/fetchSingleProcessSystem',
      payload: {
        pk,
      },
    });
  }

  const FetchAllProcessSystem = () => {
    dispatch({
      type: 'CareProcessSpace/fetchProcessSystem',
      payload: {
      },
    });
  }

  const FilterProcessSteps = (filter: string) => {
    dispatch({
      type: 'CareProcessSpace/fetchProcessNode',
      payload: {
        pn_ps: filter,
      },
    }).then((data) => {
      nodesData = data;
      //console.log('nodesData:');
      //console.log(nodesData);
      if (data){
        for (let i: number = 0; i < data.length; i++) {
          let tempProcessNode: ProcessNodeItemType = {
            id:    data[i].id,
            label: optimizeMultilineText(data[i].label, "55px Arial"),
            x:     +data[i].x,
            y:     +data[i].y,
            color: data[i].color,
            size:  data[i].size,
            shape: data[i].shape,
            parent: data[i].parent,
          };

          let addable: boolean = true;
          for (let i: number = 0; i < currentFlowData['nodes'].length; i++) {
            if (currentFlowData['nodes'][i]['id'] === tempProcessNode['id']) {
              addable = false;
            }
          };
          if (addable) {
            currentFlowData['nodes'].push(tempProcessNode);
          }
        }
      }
      dispatch({
        type: 'CareProcessSpace/fetchProcessEdge',
        payload: {
          pe_ps: filter,
        },
      }).then((data) => {
        edgesData = data;
        // console.log('edgesData:');
        // console.log(edgesData);
        if (data) {
          for (var i: number = 0; i < data.length; i++) {
            let tempProcessEdge: ProcessEdgeItemType = {
              id:      data[i].id,
              label:   data[i].label,
              source:  data[i].source,
              target:  data[i].target,
            };
            /** The unmount function is not included
             *  So need to compare each item before adding them
             */
            let addable: boolean = true;
            for (let i: number = 0; i < currentFlowData['edges'].length; i++) {
              if (currentFlowData['edges'][i]['id'] === tempProcessEdge['id']) {
                addable = false;
              }
            };
            if (addable) {
              currentFlowData['edges'].push(tempProcessEdge);
            }
          }
        }

        dispatch({
          type: 'CareProcessSpace/fetchNodeGroup',
          payload: {
            ng_ps: filter,
          },
        }).then((data: NodeGroupItemType[]) => {
          if (groupsData.length == 0) {
            for(let i: number = 0; i < data.length; i++) {
              groupsData.push(data[i]);
            }
          }
          if (data) {
            for (var i: number = 0; i < data.length; i++) {
              let tempNodeGroup: NodeGroupItemType = {
                id:      data[i].id,
                label:   data[i].label,
                x:       data[i].x,
                y:       data[i].y,
              };
              /** The unmount function is not included
               *  So need to compare each item before adding them
               */
              let addable: boolean = true;
              for (let i: number = 0; i < currentFlowData['groups'].length; i++) {
                if (currentFlowData['groups'][i]['id'] === tempNodeGroup['id']) {
                  addable = false;
                }
              };
              let addable2: boolean = false;
              for (let j: number = 0; j < currentFlowData['nodes'].length; j++) {
                if (currentFlowData['nodes'][j]['parent'] === tempNodeGroup['id']) {
                  addable2 = true;
                }
              }
              if (addable && addable2) {
                console.log('add 1 group');
                currentFlowData['groups'].push(tempNodeGroup);
              }
            }
          }
          setNewFlowData(false);
        })

        dispatch({
          type: 'CareProcessSpace/fetchProcessSystem',
          payload: {
          },
        }).then((data) => {
          systemData = data;
          console.log(systemData);          
        })
      })
    })
  }

  /** 
   *  Transform one line text to multi lines 
   *  Used for the long text on nodes
  */
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');
  const optimizeMultilineText = (text: string, font: string, maxWidth = 320) => {
    canvasContext.font = font;
    if (canvasContext.measureText(text) < maxWidth) {
      return text;
    }
    let multilineText = '';
    let multilineTextWidth = 0;
    for (const char of text) {
      const { width } = canvasContext.measureText(char);
      if (multilineTextWidth + width >= maxWidth) {
        /** https://stackoverflow.com/questions/14484787/wrap-text-in-javascript */
        multilineText = multilineText.replace(/(?![^\n]{1,11}$)([^\n]{1,11})\s/g, '$1\n');
        multilineTextWidth = 0;
      }
      multilineText += char;
      multilineTextWidth += width;
    }
    return multilineText;
  }

  const addBtn = useRef(null);
  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: ProcessSystemItemType) => {
    setVisible(true);
    setCurrent(item);
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  // Submit Process System
  const handleSubmit = (values: ProcessSystemItemType) => {
    let id = current ? current.pk : '';
    if (id) {
      id = id.replace(/-/g,"");
    }

    setAddBtnblur();
    setDone(true);
    /**console.log('DONE');*/
    dispatch({
      type: 'CareProcessSpace/submitProcessSystem',
      payload: { id, ...values },
    });
  };

  // Remove Process System
  const handleRemove = (tw: ProcessSystemItemType) => {
    const pk = tw.pk;
    console.log(tw);
    dispatch({
      type: 'CareProcessSpace/removeProcessSystem',
      payload: { pk },
    });
    window.location.reload();
  }

  // No special meaning
  // Just initial the object
  let currentProcessSystem: ProcessSystemItemType = {
    pk: 'a',
    ps_name: 'b',
    ps_desc: 'c',
  };

  /** Handle the menu change events
   *
   */
  let requestProcessSystemID:string = "";

  /** Process System 'Select' Component */
  const handleMenuChange = (value: string) => {
    currentSelect = value;
    /** Replace '-' to match the UUID type in backend database */
    requestProcessSystemID = value.replace(/-/g,"");
    currentSystemID = requestProcessSystemID;
    console.log(currentSystemID);
    if (requestProcessSystemID === "all") {
      setNewFlowData(false);
      // console.log('allllll');
      FetchAllProcessSystem();
      // Refresh the page
      window.location.reload();
    } else {
      setNewFlowData(true);
      FetchSingleProcessSystem(requestProcessSystemID);
      // console.log('spsData');
      // console.log(spsData);

      if (spsData) {
        currentProcessSystem = spsData[0];
      }
      console.log(currentProcessSystem);
      currentFlowData = {
        nodes: [],
        edges: [],
        groups: [],
      };
      FilterProcessSteps(currentSystemID);

      groupsData = [];
      dispatch({
        type: 'CareProcessSpace/fetchNodeGroup',
        payload: {
          ng_ps: currentSystemID,
        },
      }).then((data) => {                
        if (groupsData.length == 0) {
          for(let i: number = 0; i < data.length; i++) {
            groupsData.push(data[i]);
          }
        }
      })

    }
  }

  /**
   *  Display Process System Description
   *  
   */
  const handleProcessSystemDescriptionDisplay = () => {
    if (spsData) {
      currentProcessSystem = spsData[0];
    }
    /**console.log(requestProcessSystemID);*/
    if (requestProcessSystemID == "all") {
      return ("")
    }
    if (spsData) {
      currentProcessSystem = spsData[0];
      return (spsData[0].ps_desc)
    } else {
      return ("")
    }
  }

  /**
   *  Automatically synchronize graph changes to the back-end database
   */
  const handleFlowDataUpdate = (e) => {

    if (currentSelect === "all" && e.action === 'add') {
      message.info('Please First Select a Care Process System.');

    }
    /** 
     *  ADD 
     *  Ensure that user selects a process system first
     *  Otherwise the changes will not be saved
    */
    if (e.action === 'add' && currentSelect !== "all") {
      console.log('add');
      //console.log(e);
      console.log(currentFlowData);
      /** Add Process Node */      
      if (e.item.model.shape === "flow-rect" ||
          e.item.model.shape === "flow-circle" ||
          e.item.model.shape === "flow-rhombus") {

        // Initialize process node
        let tempProcessNode: ProcessNodeItemType = {
          id: e.item.model.id,
          label: e.item.model.label,
          x: e.item.model.x,
          y: e.item.model.y,
          color: e.item.model.color,
          size: e.item.model.size,
          shape: e.item.model.shape,
          pn_ps: currentSystemID,
          parent: "",
        };

        // Check if the process node is alread added
        let addable: boolean = true;
        for (let i: number = 0; i < currentFlowData['nodes'].length; i++) {
          if (currentFlowData['nodes'][i]['id'] === e.item.model.id) {
            addable = false;
          }
        };

        // Add node
        if (addable) {
          // handleProcessNodeSubmit(tempProcessNode);
          /** Add new item to the currentFlowData */
          currentFlowData['nodes'].push(tempProcessNode);
          // console.log(currentFlowData);
          /** Place the new node to the detail card */
          currentStepName = e.item.model.label;
          form.setFieldsValue({
            pn_name: currentStepName,
          });

          dispatch({
            type: 'CareProcessSpace/submitProcessNode',
            payload: { ...tempProcessNode },
          });
          // handleProcessNodeSubmit(tempProcessNode);
        }
      }

      /** Add Process Edge */
      if (e.item.model.source) {
        let tempProcessEdge: ProcessEdgeItemType = {
          id: e.item.model.id,
          label: e.item.model.label,
          source: e.item.model.source,
          target: e.item.model.target,
          pe_ps: currentSystemID,
        };

        let addable: boolean = true;
        for (let i: number = 0; i < currentFlowData['edges'].length; i++) {
          if (currentFlowData['edges'][i]['id'] === e.item.model.id) {
            addable = false;
          }
        };

        if (addable) {
          currentFlowData['edges'].push(tempProcessEdge);
          dispatch({
            type: 'CareProcessSpace/submitProcessEdge',
            payload: { ...tempProcessEdge },
          });
        }

      }

      console.log(currentFlowData);
    }
    /** -------------------------- */
    /** UPDATE */
    if (e.action == 'update' && currentSelect !== "all") {
      //console.log('update');
      //console.log(e);
      //console.log('St START');
      //console.log(e);
      //console.log('St END');
      /** Update Group */      
      if (e.item.isGroup && !e.item.model.collapsed) {
        //console.log('Gla');
        let groups = Array.from(currentFlowData['groups']);
        for (let i: number = 0; i < groups.length; i++) {
          if (e.item.model.id == currentFlowData['groups'][i]['id']) {
            let tempNodeGroup: NodeGroupItemType = {
              id: e.item.model.id,
              label: e.item.model.label,
              x: e.item.model.x,
              y: e.item.model.y,
            };
            if ((e.item.model.x == currentFlowData['groups'][i]['x']) &&
            (e.item.model.y == currentFlowData['groups'][i]['y']) &&
            (e.item.model.label == currentFlowData['groups'][i]['label']) ) {
              console.log('nothing to do');
            } else {
              dispatch({
                type: 'CareProcessSpace/updateNodeGroup',
                payload: { ...tempNodeGroup },
              });
              currentFlowData['groups'][i]['x'] = e.item.model.x;
              currentFlowData['groups'][i]['y'] = e.item.model.y;
              currentFlowData['groups'][i]['label'] = e.item.model.label;
            }

          }
        }
      }
      /** Update Node */
      if (e.item.model.shape == "flow-rect" ||
          e.item.model.shape == "flow-circle" ||
          e.item.model.shape == "flow-rhombus") {
        console.log(e);
        let nodes = Array.from(currentFlowData['nodes']);
        for (let i: number = 0; i < nodes.length; i++) {
          if (e.item.model.id == currentFlowData['nodes'][i]['id']) {
            let tempProcessNode: ProcessNodeItemType = {
              id: e.item.model.id,
              label: e.item.model.label,
              x: e.item.model.x,
              y: e.item.model.y,
              color: e.item.model.color,
              size: e.item.model.size,
              shape: e.item.model.shape,
              parent: e.item.model.parent,
            };

            if ((e.item.model.x != currentFlowData['nodes'][i]['x']) ||
            (e.item.model.y != currentFlowData['nodes'][i]['y']) ||
            (e.item.model.parent != currentFlowData['nodes'][i]['parent']) ||
            (e.item.model.label != currentFlowData['nodes'][i]['label'])) {
              currentFlowData['nodes'][i]['x'] = e.item.model.x;
              currentFlowData['nodes'][i]['y'] = e.item.model.y;
              currentFlowData['nodes'][i]['label'] = e.item.model.label;
              currentFlowData['nodes'][i]['parent'] = e.item.model.parent;
            }
            dispatch({
              type: 'CareProcessSpace/updateProcessNode',
              payload: { ...tempProcessNode },
            });
          }
        }
      }

      /** Update Edge */
      if (e.item.model.source) {
        let edges = Array.from(currentFlowData['edges']);
        //console.log('232');
        //console.log(e);
        for (let i: number = 0; i < edges.length; i++) {
          if (e.item.model.id == currentFlowData['edges'][i]['id']) {
            let tempProcessEdge: ProcessEdgeItemType = {
              id: e.item.model.id,
              label: e.item.model.label,
              source: e.item.model.source,
              target: e.item.model.target,
            };

            if (e.item.model.target.x) {
              tempProcessEdge['target'] = "";
            };

            dispatch({
              type: 'CareProcessSpace/updateProcessEdge',
              payload: { ...tempProcessEdge },
            });
            currentFlowData['edges'][i]['label'] = e.item.model.label;
            currentFlowData['edges'][i]['source'] = e.item.model.source;
            currentFlowData['edges'][i]['target'] = e.item.model.target;
          }
        }
      }
    }

    //console.log(currentFlowData);
    /** -------------------------- */
    /** REMOVE */
    if (e.action == 'remove' && currentSelect !== "all") {
      console.log('remove');
      console.log(currentFlowData);
      console.log(e);

      /** Delete Group */
      if (e.item.isGroup) {
        console.log('Its a group');
        currentGroupID = e.item.model.id;
        for (let i: number = 0; i < currentFlowData['nodes'].length; i++) {
          if (currentFlowData['nodes'][i]['parent'] == currentGroupID) {
            currentFlowData['nodes'][i]['parent'] = "";
            let tempProcessNode: ProcessNodeItemType = {
              id: currentFlowData['nodes'][i]['id'],
              parent: "",
              x: currentFlowData['nodes'][i]['x'],
              y: currentFlowData['nodes'][i]['y'],
              color: currentFlowData['nodes'][i]['color'],
              shape: currentFlowData['nodes'][i]['shape'],
              size: currentFlowData['nodes'][i]['size'],
            }

            dispatch({
              type: 'CareProcessSpace/updateProcessNode',
              payload: { ...tempProcessNode },
            });
          }
        }

        // Remove group
        let groups = Array.from(currentFlowData['groups']);
        let num: number = -1;
        for (let ii: number = 0; ii < groups.length; ii++) {
          if (currentGroupID == currentFlowData['groups'][ii]['id']) {
            num = ii;
          }
        }
        currentFlowData['groups'].splice(num, 1);
        const id: string = currentGroupID;
        dispatch({
          type: 'CareProcessSpace/removeNodeGroup',
          payload: { id, },
        });
        currentGroupID = "";
      }


      /** Delete Edge */
      if (e.item.model.source) {
        let edges = Array.from(currentFlowData['edges']);
        for (var i: number = 0; i < edges.length; i++) {
          if (e.item.model.id == currentFlowData['edges'][i]['id']) {
            currentFlowData['edges'].splice(i, 1);
            const id: string = e.item.model.id;
            dispatch({
              type: 'CareProcessSpace/removeProcessEdge',
              payload: { id },
            });
          }
        }
      }

      /** Delete Node and related Edge */
      if (e.item.model.shape == "flow-rect" ||
          e.item.model.shape == "flow-circle" ||
          e.item.model.shape == "flow-rhombus") {
        /** If there is at least 1 edge exisits */
        if (currentFlowData['edges'][0]) {
          let edges = Array.from(currentFlowData['edges']);
          /** Find if there is related edges */
          for (var i: number = 0; i < edges.length; i++) {
            if (currentFlowData['edges'][i]) {
              if (e.item.model.id == currentFlowData['edges'][i]['source'] ||
                  e.item.model.id == currentFlowData['edges'][i]['target']) {
                /** Delete related edges either */

                const id: string = currentFlowData['edges'][i]['id'];

                dispatch({
                  type: 'CareProcessSpace/removeProcessEdge',
                  payload: { id },
                });

                console.log(currentFlowData['edges'][i]);
                currentFlowData['edges'].splice(i, 1);
                console.log(currentFlowData['edges'][i]);
                i = i - 1;
              }
            }
          }
        }
        let nodes = Array.from(currentFlowData['nodes']);
        let num: number = -1;
        for (var i: number = 0; i < nodes.length; i++) {
          if (e.item.model.id == currentFlowData['nodes'][i]['id']) {
            num = i;
          }
        }
        currentFlowData['nodes'].splice(num, 1);
        const id: string = e.item.model.id;
        dispatch({
          type: 'CareProcessSpace/removeProcessNode',
          payload: { id },
        });
      }
      console.log(currentFlowData);
    }
  }

  const handleTabClick = (params: string) => {
    setDefaultActivateKey(params);
  }

  /** When click an edge */
  const handleCurrentStepNameEdge = (e) => {
    // Reset 'selected node' value
    currentNodeID = "";

    setNodeClick(false);
    setDefaultActivateKey("1");
    if (e.item && e.action != 'remove') {
      // Set the 'Detail' Panel
      currentStepName = e.item.model.label;
      currentStepID = e.item.model.id;
      let currentStepDesc: string = "";

      /** Search edgesData for related edge */
      for (let i: number = 0; i < Object.keys(edgesData).length; i++) {
        if (currentFlowData['edges'][i]['id'] == e.item.model.id) {
          currentStepName = e.item.model.label;
          currentStepDesc = edgesData[i]['pe_desc'] ?? "";
          /**console.log(currentStepName);*/
        }
      };

      console.log(currentStepName);
      //console.log(currentStepDesc);
      form.setFieldsValue({
        pn_name: currentStepName,
        pn_desc: currentStepDesc,
        pn_ng: "all",
        pn_cs: "all",
      });
    }
  }

  const [stepName, setStepName] = useState("");
  const [stepDesc, setStepDesc] = useState("");
  //let pX: number = 0;
  //let pY: number = 0;
  const [pY, setPY] = useState(0);
  const [pX, setPX] = useState(0);

  /**
   *  Popopver Content
   *  Not enabled in current version
   *  Could slow down the browser
   *  Needs to optimize
   */
  const handlePopover = (e) => {
    //console.log(e);
    //stepName = e.item.model.label;
    //setPX(e.item.bbox.centerX);
    //setPY(e.item.bbox.minY);
    setPX(e.domX);
    setPY(e.domY);

    //console.log(e);
    for (let i: number = 0; i < Object.keys(nodesData).length; i++) {
      if (nodesData[i]['id'] === e.item.model.id) {
        setStepName(nodesData[i]['label'] ?? "");
        if (nodesData[i]['pn_desc']) {
          setStepDesc(nodesData[i]['pn_desc'] ?? "");
        } else {
          setStepDesc("");
        }
      }
    }    
    setPopoverVisible(true);
  }

  const popContent = (
    <div>    
      <p>Name: { stepName }</p>
      <p>Description: { stepDesc }</p>      
    </div>
  );


  /** When click a node */
  const handleCurrentStepName = (e) => {
    console.log(currentFlowData);
    setNodeClick(true);

    if (e.item && e.action != 'remove') {
      currentStepName = e.item.model.label;
      currentStepID = e.item.model.id;
      currentNodeID = e.item.model.id;
      
      if (e.item.model.parent == "") {
        currentNodeParent = "all";
      } else {
        currentNodeParent = e.item.model.parent;
      }
      //console.log(currentStepID);
      let currentStepDesc: string = "";
      let currentStepCS: string = "all";

      setAssociationID(currentStepID);
      //console.log('this is assocaitionID')
      //console.log(associationID);

      for (let i: number = 0; i < Object.keys(nodesData).length; i++) {
        if (nodesData[i]['id'] == e.item.model.id) {
          currentStepName = nodesData[i]['label'] ?? "";
          if (nodesData[i]['pn_desc']) {
            currentStepDesc = nodesData[i]['pn_desc'] ?? "";
          }
          if (nodesData[i]['pn_cs']) {
            currentStepCS = nodesData[i]['pn_cs'] ?? "";
          }
        }
      }

      form.setFieldsValue({
        pn_name: currentStepName,
        pn_desc: currentStepDesc,
        pn_cs: currentStepCS,
        pn_ng: currentNodeParent,      
      });


      console.log(currentStepName);
      //console.log(currentStepDesc);

      /**
      console.log(currentStepName);
      console.log(currentStepID);*/
    }
  }



  /** Process Step Information Update
   *  Including 'ps_name' 'ps_desc'
   */
  const onFinish = (values: { [key: string]: any }) => {
    let x: number = 0;
    let y: number = 0;
    let shape: string = "";
    let size: string = "";
    let color: string = "";
    let parent: string = "";

    if (values.pn_ng != "all") {
      parent = values.pn_ng;
    }

    for (let i: number = 0; i < currentFlowData['nodes'].length; i++) {
      if (currentFlowData['nodes'][i]['id'] == currentStepID) {
        x = currentFlowData['nodes'][i]['x'];
        y = currentFlowData['nodes'][i]['y'];
        shape = currentFlowData['nodes'][i]['shape'];
        size = currentFlowData['nodes'][i]['size'];
        color = currentFlowData['nodes'][i]['color'];
        currentFlowData['nodes'][i]['label'] = optimizeMultilineText(values.pn_name, "55px Arial");
        currentFlowData['nodes'][i]['parent'] = values.pn_ng;
      }
    };

    let source: string = "";
    let target: string = "";
    for (let i: number = 0; i < currentFlowData['edges'].length; i++) {
      if (currentFlowData['edges'][i]['id'] == currentStepID) {
        source = currentFlowData['edges'][i]['source'];
        target = currentFlowData['edges'][i]['target'];
        currentFlowData['edges'][i]['label'] = values.pn_name;
      }
    };

    if ((source == "") && (shape != "")) {
      // Node
      let params: {} = {
        id: currentStepID,
        label: values.pn_name,
        pn_desc: values.pn_desc,
        pn_cs: values.pn_cs,
        parent,
        x,
        y,
        shape,
        size,
        color,
      }
      dispatch({
        type: 'CareProcessSpace/updateProcessNode',
        payload: params,
      }).then(() => {
        FilterProcessSteps(currentSystemID);
      })
    } else {
      if (shape != "") {
        // Edge
        let params: {} = {
          id: currentStepID,
          label: values.pn_name,
          pe_desc: values.pn_desc,
          source,
          target,
        }
        dispatch({
          type: 'CareProcessSpace/updateProcessEdge',
          payload: params,
        }).then(() => {
          FilterProcessSteps(currentSystemID);
        })
      } else {
        // Group
        let params: {} = {
          id: currentStepID,
          label: values.pn_name,
        }
        dispatch({
          type: 'CareProcessSpace/updateNodeGroup',
          payload: params,
        }).then(() => {
          for (let kk: number = 0; kk < currentFlowData['groups'].length; kk++) {
            if (currentFlowData['groups'][kk]['id'] == currentStepID) {
              currentFlowData['groups'][kk]['label'] = values.pn_name;
            }
          }
          dispatch({
            type: 'CareProcessSpace/fetchProcessSystem',
            payload: {
            },
          }).then((data) => {
            systemData = data;
            console.log(systemData);
          })
        })
      }
    }

    message.success('Successfully Updated');
    //window.location.reload();
  };

  return (
    <PageHeaderWrapper>
      <Card
        bordered={false}
        title="Care Process System"
      >
        <Form
        layout="inline"
        form={form}
        >
          <StandardFormRow title="Select Care Process System" grid last>
            <Row gutter={[10, 10]} justify="space-around">
              <Col span={10}>
                <Select
                  defaultValue={currentSelect}
                  style={{ width: 220 }}
                  placeholder="Please select"
                  onChange={handleMenuChange.bind(this)}
                >
                  <Option value="all" key="allmenu">Select A Process System</Option>
                  {
                      psData!.map( (ps) => (
                        <Option key={ps.pk} value={ps.pk}>{ps.ps_name}</Option>)
                      )
                  }
                </Select>
              </Col>
              <Col>
                <FormItem {...formItemLayout}>
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={showModal}
                  >New
                  </Button>
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} shouldUpdate>
                  {()=>{
                    return (
                      <Button
                        disabled={currentProcessSystem.pk=='a'}
                        icon={<EditOutlined />}
                        onClick={() => {
                          showEditModal(currentProcessSystem);
                        }}
                        >
                          Change Detail
                      </Button>
                    );
                  }}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} shouldUpdate>
                  {()=>{
                    return (
                      <Button
                        icon={<DeleteOutlined />}
                        disabled={currentProcessSystem.pk=='a'}
                        onClick={() => {
                          handleRemove(currentProcessSystem);
                        }}
                      >Delete
                      </Button>
                    );
                  }}
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow >
          <StandardFormRow title="Care Process System Description " grid last>
            <Row gutter={16}>
              <Descriptions>
                <DescriptionsItem span={3}>
                  {handleProcessSystemDescriptionDisplay()}
                </DescriptionsItem>
              </Descriptions>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>

      <Card
        bordered={false}
        title="Care Process Editor"
        style={{ marginTop: 24 }}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
      <Row gutter={[8, 8]}>
      <Col>
        <Button
          type="primary"
          onClick={() => {
            /** Add New Group
             *  First check if a node is selected
             *  Then add a group with the selected node
             */
            if (currentNodeID == "") {
              message.info("Please select a process node")
            } else {
              // Generate a unique id for new group
              const ng_id: string = "group" + Math.random().toString().substr(3,length) + Date.now().toString(36);
              const ng_label: string = "group " + Date.now().toString(36);

              let ngItem: NodeGroupItemType = {
                id: ng_id,
                label: ng_label,
                ng_ps: currentSystemID,
              };
              // console.log(ngItem);

              let x: number = 0;
              let y: number = 0;
              let color: string = "";
              let shape: string = "";
              let size: string = "";
              for (let i: number = 0; i < currentFlowData['nodes'].length; i++) {
                //console.log(currentNodeID);
                //console.log(currentFlowData['nodes'][i]['parent']);
                if (currentFlowData['nodes'][i]['id'] == currentNodeID) {
                  //console.log('FOUND');
                  if ((currentFlowData['nodes'][i]['parent'] == "") || (currentFlowData['nodes'][i]['parent'] == "all")) {
                    //console.log('didosfjo');
                    // Update currentFlowData
                    currentFlowData['groups'].push(ngItem);

                    // First update 'parent' field of current flow data
                    currentFlowData['nodes'][i]['parent'] = ng_id;

                    // Fetch other data from 'currentFlowData'
                    // To update the back-end database
                    color = currentFlowData['nodes'][i]['color'];
                    x = currentFlowData['nodes'][i]['x'];
                    y = currentFlowData['nodes'][i]['y'];
                    shape = currentFlowData['nodes'][i]['shape'];
                    size = currentFlowData['nodes'][i]['size'];  

                    let tempProcessNode: ProcessNodeItemType = {
                      id: currentNodeID,
                      parent: ng_id,
                      x: x,
                      y: y,
                      color: color,
                      shape: shape,
                      size: size,
                    }
      
                    dispatch({
                      type: 'CareProcessSpace/updateProcessNode',
                      payload: { ...tempProcessNode },
                    });
      
                    dispatch({
                      type: 'CareProcessSpace/submitNodeGroup',
                      payload: { 
                        id: ng_id,
                        label: ng_label,
                        ng_ps: currentSystemID,
                      },
                    }).then(() => {
                      groupsData = [];
                      dispatch({
                        type: 'CareProcessSpace/fetchNodeGroup',
                        payload: {
                          ng_ps: currentSystemID,
                        },
                      }).then((data) => {                
                        if (groupsData.length == 0) {
                          for(let i: number = 0; i < data.length; i++) {
                            groupsData.push(data[i]);
                          }
                        }
                      })
                    })
                  } else {
                    message.info('Selected node is alread in a group.');
                  }             
                }
              }
            }
          }}             
        >            
          Create Group
        </Button>
      </Col>

      <Col>
        <Button
          danger
          onClick={() => {
            if (currentGroupID != ""){
              // Handle related nodes
              for (let i: number = 0; i < currentFlowData['nodes'].length; i++) {
                if (currentFlowData['nodes'][i]['parent'] == currentGroupID) {
                  currentFlowData['nodes'][i]['parent'] = "";
                  let tempProcessNode: ProcessNodeItemType = {
                    id: currentFlowData['nodes'][i]['id'],
                    parent: "",
                    x: currentFlowData['nodes'][i]['x'],
                    y: currentFlowData['nodes'][i]['y'],
                    color: currentFlowData['nodes'][i]['color'],
                    shape: currentFlowData['nodes'][i]['shape'],
                    size: currentFlowData['nodes'][i]['size'],
                  }
    
                  dispatch({
                    type: 'CareProcessSpace/updateProcessNode',
                    payload: { ...tempProcessNode },
                  });
                }
              }

              // Remove group
              let groups = Array.from(currentFlowData['groups']);
              let num: number = -1;
              for (let ii: number = 0; ii < groups.length; ii++) {
                if (currentGroupID == currentFlowData['groups'][ii]['id']) {
                  num = ii;
                }
              }
              currentFlowData['groups'].splice(num, 1);
              const id: string = currentGroupID;
              dispatch({
                type: 'CareProcessSpace/removeNodeGroup',
                payload: { id, },
              }).then(() => {
                groupsData = [];
                dispatch({
                  type: 'CareProcessSpace/fetchNodeGroup',
                  payload: {
                    ng_ps: currentSystemID,
                  },
                }).then((data) => {                
                  if (groupsData.length == 0) {
                    for(let i: number = 0; i < data.length; i++) {
                      groupsData.push(data[i]);
                    }
                  }
                })
              })
              currentGroupID = "";
            } else {
              message.info('Please select a group');
            }
          }}
        >
          Delete Group
        </Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            /** Remove a node from group 
             *  If it is the last node in the group
             *  Delete the group!
             */
            if (currentNodeID != "") {
              let ngItem: string = "";

              for (let i: number = 0; i < currentFlowData['nodes'].length; i++) {
                if (currentFlowData['nodes'][i]['id'] == currentNodeID) {
                  ngItem = currentFlowData['nodes'][i]['parent'];
                  currentFlowData['nodes'][i]['parent'] = "";

                  let tempProcessNode: ProcessNodeItemType = {
                    id: currentNodeID,
                    parent: "",
                    x: currentFlowData['nodes'][i]['x'],
                    y: currentFlowData['nodes'][i]['y'],
                    color: currentFlowData['nodes'][i]['color'],
                    shape: currentFlowData['nodes'][i]['shape'],
                    size: currentFlowData['nodes'][i]['size'],
                  }
    
                  dispatch({
                    type: 'CareProcessSpace/updateProcessNode',
                    payload: { ...tempProcessNode },
                  });
                  /**
                  if ((currentFlowData['nodes'][i]['parent'] != "") && (
                    currentFlowData['nodes'][i]['parent'] != "all"
                  )) {
                    let deletable:boolean = true;
                    for (let j: number = 0; j < currentFlowData['nodes'].length; j++) {
                      if (currentFlowData['nodes'][j]['parent'] == ngItem) {
                        deletable = false;
                      }
                    }
                    if (deletable) {
                      let groups = Array.from(currentFlowData['groups']);
                      let num: number = -1;
                      for (let ii: number = 0; ii < groups.length; ii++) {
                        if (ngItem == currentFlowData['groups'][ii]['id']) {
                          num = ii;
                        }
                      }
                      currentFlowData['groups'].splice(num, 1);
                      const id: string = ngItem;
                      dispatch({
                        type: 'CareProcessSpace/removeNodeGroup',
                        payload: { id, },
                      }).then(() => {
                        groupsData = [];
                        dispatch({
                          type: 'CareProcessSpace/fetchNodeGroup',
                          payload: {
                            ng_ps: currentSystemID,
                          },
                        }).then((data) => {                
                          if (groupsData.length == 0) {
                            for(let i: number = 0; i < data.length; i++) {
                              groupsData.push(data[i]);
                            }
                          }
                        })
                      })
                    }
                  }
                  */
                }
              }
            } else {
              message.info("Please select a node");
            }
          }}
        >
          Release From Group
        </Button>
      </Col>
    </Row>
        <GGEditor
          className={styles.editor}          
        >
          
          <Row className={styles.editorHd}>
            <Col span={24}>
              <FlowConfiguration 
                flowData={currentFlowData}
                currentSelect={currentSelect}
                newFlowData={newFlowData}
              />
            </Col>
          </Row>

          <Row className={styles.editorBd}>
            <Col span={4} className={styles.editorSidebar}>
              <FlowItemPanel />
            </Col>
            <Col span={16} className={styles.editorContent}>

              <Flow                
                className={styles.flow}
                noEndEdge={ false }
                //data={currentFlowData}
                
                onAfterChange={(e) => {
                  handleFlowDataUpdate(e);                  
                  //setNewFlowData(false);
                }}

                onDragEnter={(e) => {
                  setNewFlowData(false);
                }}
                //read={currentFlowData}
                onNodeClick={(e) => {
                  setDescriptionDisable(false);
                  handleCurrentStepName(e);
                  setNewFlowData(false);
                }}
                onEdgeClick={(e) => {
                  setDescriptionDisable(false);
                  handleCurrentStepNameEdge(e);
                  setNewFlowData(false);
                }}

                onAfterItemUnselected={(e) => {
                  setDescriptionDisable(true);
                  console.log('unselected');
                  console.log(e);
                  if (e.item.type == "node") {
                    currentNodeID = "";
                    setNodeClick(false);
                    console.log('node cleareeedd');
                  }

                  if (e.item.type == "group") {
                    currentGroupID = "";
                    console.log('group cleareddd');
                  }
                }}
                onAfterItemSelected={(e) => {
                  //console.log('Item');
                  // When select a Group
                  if (e.item.isGroup) {
                    setDescriptionDisable(true);
                    //console.log(e);
                    currentNodeID = "";
                    currentGroupID = e.item.id;
                    currentStepID = e.item.id;
                    //console.log('group');
                    //console.log(currentGroupID);
                    currentNodeID = "";

                    setNodeClick(false);
                    setDefaultActivateKey("1");
                    if (e.item && e.action != 'remove') {
                      currentStepName = e.item.model.label;
                      currentStepID = e.item.model.id;

                      console.log(currentStepName);
                      //console.log(currentStepDesc);
                      form.setFieldsValue({
                        pn_name: currentStepName,
                        pn_desc: "",
                        pn_cs: "all",
                        pn_ng: "all",
                      });
                    }
                  } else {
                    currentGroupID = "";
                    //console.log('group cleared');
                  }
                  
                }}
                onNodeMouseEnter={(e) => {
                  //console.log('Hello');
                  // handlePopover(e);
                  
                }}
                onNodeMouseLeave={() => {
                  setPopoverVisible(false);
                }}
              />

              <Popover 
                visible={popoverVisible} 
                title="Basic Information" 
                content={popContent}
              >
                <div style={{ position: 'absolute', top: pY, left: pX }} />
              </Popover>

            </Col>
            <Col span={4} className={styles.editorSidebar}>
              <EditorMinimap />
            </Col>
          </Row>
          <FlowContextMenu />
        </GGEditor>
      </Card>

      <Card
      title="Activity Detail"
      bordered={false}
      style={{ marginTop: 24 }}
      bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <Tabs
          type="card"
          activeKey={defaultActiveKey}
          onTabClick={(params)=>handleTabClick(params)}
        >
          <TabPane key="1" tab="Activity Property">
            <Form
              layout="vertical"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
            >
              <FormItem
                label="Name"
                name="pn_name"
                rules={[{ required: false, message: 'Activity Name' }]}
              >
                <Input style={{ width: '50%' }} placeholder="Activity Name" maxLength={46}/>
              </FormItem>

              <FormItem
                label="Care Setting Association"
                name="pn_cs"
              >
                <Select
                  disabled={nodeClick==false}
                  defaultValue="all"
                  style={{ width: 220 }}
                  placeholder="Please select"
                  //onChange={handleMenuChange.bind(this)}
                >
                  <Option value="all" key="allmenu">Select a Care Setting</Option>
                  {
                    csData!.map( (cs) => (
                      <Option key={cs.pk} value={cs.pk}>{cs.cs_name}</Option>)
                    )
                  }
                </Select>
              </FormItem>

              <FormItem
                label="Group"
                name="pn_ng"
              >
                <Select
                  //disabled={nodeClick==false}
                  defaultValue="all"
                  style={{ width: 220 }}
                  placeholder="Please select"
                  disabled={nodeClick===false}
                  //onChange={handleMenuChange.bind(this)}
                >
                  <Option value="all" key="allmenu">Select a Group</Option>
                  {
                    
                    groupsData.map( (ng) => {
                      return <Option key={ng.id} value={ng.id}>{ng.label}</Option>
                    })
                  }
                </Select>
              </FormItem>

              <FormItem
                label="Description"
                name="pn_desc"
              >
                <TextArea disabled={descriptionDisable} rows={4}  placeholder="Activity Description" />
              </FormItem>

              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Update
                </Button>

                <Button>
                  Reset
                </Button>
              </Space>

            </Form>
          </TabPane>

          <TabPane
            key="2"
            tab="Associated System Function"
            disabled={nodeClick===false}
          >
            <SystemFunctionAssociation
              stepID = { associationID }
            />
          </TabPane>

          <TabPane
            key="3"
            tab="Associated Hazard Instance"
            disabled={nodeClick===false}
          >
            <HazardInstanceAssociation
              stepID = { associationID }
            />
          </TabPane>
        </Tabs>
      </Card>


      <ProcessSystemAction
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    CareProcessSpace,
     }: {
    CareProcessSpace: CareProcessState;
    }) => ({
    CareProcessSpace,
  }),
)(ProcessEditor);
