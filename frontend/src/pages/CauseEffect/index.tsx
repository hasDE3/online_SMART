/**
 * 'Cause and Effect Editor' as a separate page. 
 */

import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Card, Form, Divider, Select, Col, Table, Row, Tag, message } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { EditHazardInstanceState } from '@/pages/EditHazardInstance/models/EditHazardInstanceModel';
import { HazardInstanceItemType } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { parse } from 'querystring';
import { findDOMNode } from 'react-dom';

import CauseAction from './components/CauseAction';
import CauseControlAction from './components/CauseControlAction';
import EffectAction from './components/EffectAction';
import EffectControlAction from './components/EffectControlAction';

import { CauseEffectState } from '@/models/CauseEffectModel';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';


const FormItem = Form.Item;
const { Option } = Select;

let hazardinstanceData: HazardInstanceItemType[] = [];

interface CauseEffectProps {
    dispatch: Dispatch<any>;
    EditHazardInstanceSpace: EditHazardInstanceState;
    CauseEffectSpace: CauseEffectState;
  }

const CauseEffect: React.FC<CauseEffectProps> = ({
    dispatch,
    EditHazardInstanceSpace: { htData, hiData, sfData, rmData },
    CauseEffectSpace: { caData, efData, cacoData, efcoData },
  }) => {
    const addBtn = useRef(null);
    const setAddBtnblur = () => {
      if (addBtn.current) {        
        const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
        setTimeout(() => addBtnDom.blur(), 0);
      }
    };

    const [hazardinstanceID, setHazardInstanceID] = useState("");
    const [currentFormID, setCurrentFormID] = useState("");
    const [currentSelect, setCurrentSelect] = useState("all");

    useEffect(() => {
      dispatch({
        type: 'CauseEffectSpace/fetchCauseControl',
        payload: {
        },
      });
    }, []);

    useEffect(() => {
      dispatch({
        type: 'CauseEffectSpace/fetchEffectControl',
        payload: {
        },
      });
    }, []);

    const FilterCauseEffect = (value: string) => {
      dispatch({
        type: 'CauseEffectSpace/fetchCause',
        /** Here the payload param will be transformed to 'effect' */
        payload: {
          ca_hi: value,
        },
      });

      dispatch({
        type: 'CauseEffectSpace/fetchEffect',
        /** Here the payload param will be transformed to 'effect' */
        payload: {
          ef_hi: value,
        },
      });
    }

    useEffect(() => {
      hazardinstanceData = [];
      dispatch({
        type: 'EditHazardInstanceSpace/fetchHazardInstance',
        payload: {   
        },
      }).then((data: HazardInstanceItemType[]) => {
        if (hazardinstanceData.length == 0) {
          for(let i: number = 0; i < data.length; i++) {
            hazardinstanceData.push(data[i]);
          }
        }
      })
    }, []);

    /** Selector 'menu' change */
    const handleMenuChange = (value: string) => {
      setHazardInstanceID(value);
      setCurrentSelect(value);
      console.log(currentSelect);

      dispatch({
        type: 'CauseEffectSpace/fetchCauseControl',
        payload: {          
        },
      });

      dispatch({
        type: 'CauseEffectSpace/fetchEffectControl',
        payload: {          
        },
      });

      if (value == "all") {
        //FetchAllHazardInstance();
        //window.location.reload();
        FilterCauseEffect("");
      } else {
        FilterCauseEffect(value);
      }
    }

    /** Effect Control Related Actions */
    /** ------------------------------------------------------------------------ */
    const [effectcontrolDone, setEffectControlDone] = useState<boolean>(false);
    const [effectcontrolVisible, setEffectControlVisible] = useState<boolean>(false);
    const [effectcontrolCurrent, setEffectControlCurrent] = useState<Partial<EffectControlItemType> | undefined>(undefined);

    const showEffectControlModal = () => {
      if (efData) {
        if (efData.length == 0) {
          message.info('Please Add a Effect Before Adding Control');
        } else {
          setEffectControlVisible(true);
          setEffectControlCurrent(undefined);
        }
      }
    };
  
    const showEffectControlEditModal = (item: EffectControlItemType) => {
      setEffectControlVisible(true);
      setEffectControlCurrent(item);
    };

    const handleEffectControlDone = () => {
      setAddBtnblur();
      setEffectControlDone(false);
      setEffectControlVisible(false);
    };
  
    const handleEffectControlCancel = () => {
      setAddBtnblur();
      setEffectControlVisible(false);
    };
  
    const handleEffectControlRemove = (pk: string) => {
      dispatch({
        type: 'CauseEffectSpace/removeEffectControl',
        payload: { pk },
      });
    };
    
    const handleEffectControlSubmit = (values: EffectControlItemType) => {      
      setAddBtnblur();      

      let type: string = "";
      if (values.efco_desc) {
        for (let i:number = 0; i < values.efco_type.length; i++) {
          type = values.efco_type[i] + ';' + type;
        }
      }

      let preSubmitEffectControl: EffectControlItemType = {
        efco_name: values.efco_name,
        efco_desc: values.efco_desc,
        efco_ef: values.efco_ef,
        efco_state: values.efco_state,
        efco_type: type,
      };

      let id: string = currentFormID;
            
      dispatch({
        type: 'CauseEffectSpace/submitEffectControl',
        payload: { id, ...preSubmitEffectControl },
      });

      setEffectControlDone(true);
    }

    /** Cause Control Related Actions */
    /** ------------------------------------------------------------------------ */
    const [causecontrolDone, setCauseControlDone] = useState<boolean>(false);
    const [causecontrolVisible, setCauseControlVisible] = useState<boolean>(false);
    const [causecontrolCurrent, setCauseControlCurrent] = useState<Partial<CauseControlItemType> | undefined>(undefined);

    const showCauseControlModal = () => {
      if (caData) {
        if (caData.length == 0) {
          message.info('Please Add a Cause Before Adding Control');
        } else {
          setCauseControlVisible(true);
          setCauseControlCurrent(undefined);
        }
      }
    };
  
    const showCauseControlEditModal = (item: CauseControlItemType) => {
      setCauseControlVisible(true);
      setCauseControlCurrent(item);
    };

    const handleCauseControlDone = () => {
      setAddBtnblur();
      setCauseControlDone(false);
      setCauseControlVisible(false);
    };
  
    const handleCauseControlCancel = () => {
      setAddBtnblur();
      setCauseControlVisible(false);
    };
  
    const handleCauseControlRemove = (pk: string) => {
      dispatch({
        type: 'CauseEffectSpace/removeCauseControl',
        payload: { pk },
      });
    };
    
    const handleCauseControlSubmit = (values: CauseControlItemType) => {
      console.log(values);

      setAddBtnblur();      

      let type: string = "";

      if (values.caco_type) {
        for (let i:number = 0; i < values.caco_type.length; i++) {
          type = values.caco_type[i] + ';' + type;
        }
      }

      let preSubmitCauseControl: CauseControlItemType = {
        caco_name: values.caco_name,
        caco_desc: values.caco_desc,
        caco_ca: values.caco_ca,
        caco_state: values.caco_state,
        caco_type: type,
      };

      let id: string = currentFormID;
          
      dispatch({
        type: 'CauseEffectSpace/submitCauseControl',
        payload: { id, ...preSubmitCauseControl },
      });

      setCauseControlDone(true);
    }

    /** Cause Related Actions */
    /** ------------------------------------------------------------------------ */
    const [causeDone, setCauseDone] = useState<boolean>(false);
    const [causeVisible, setCauseVisible] = useState<boolean>(false);
    const [causeCurrent, setCauseCurrent] = useState<Partial<CauseItemType> | undefined>(undefined);
    
    const showCauseModal = () => {
      let item: CauseItemType = {};
      if (currentSelect != "all") {
        item = {
          ca_hi: currentSelect,
        }
      }
      setCauseVisible(true);
      setCauseCurrent(item);
    };
  
    const showCauseEditModal = (item: CauseItemType) => {
      setCauseVisible(true);
      setCauseCurrent(item);
    };

    const handleCauseDone = () => {
      setAddBtnblur();
      setCauseDone(false);
      setCauseVisible(false);
    };
  
    const handleCauseCancel = () => {
      setAddBtnblur();
      setCauseVisible(false);
    };
  
    const handleCauseRemove = (pk: string) => {
      if (cacoData) {
        for (let i:number = 0; i < cacoData.length; i++) {
          //console.log(pk);
          //console.log(cacoData[i]['caco_ca']);
          if (cacoData[i]['caco_ca'].replace(/-/g,"") == pk) {
            dispatch({
              type: 'CauseEffectSpace/removeCauseControl',
              payload: { 
                pk: cacoData[i]['id'],
              },
            });
          }
        }
      }

      dispatch({
        type: 'CauseEffectSpace/removeCause',
        payload: { pk },
      });

    };

    const handleCauseSubmit = (values: CauseItemType) => {
      let id = causeCurrent ? causeCurrent.id : '';
  
      if (id) {
        id = id.replace(/-/g,"");
      }

      //console.log(values);
      setAddBtnblur();      

      if ((currentSelect == "all") || (!currentSelect)){
        for (let i: number = 0; i < caData!.length; i++) {
          //console.log(caData![i]['id']);
          //console.log(currentFormID);
          if (caData![i]['id'] == currentFormID) {
            //console.log('GOT IT');            
            //setHazardInstanceID(caData![i]['ca_hi']);            
            setCurrentSelect(caData[i]['ca_hi']);
            //console.log(caData![i]['ca_hi']);
          }
        }
      }
      //console.log(currentSelect);

      let preSubmitCause: CauseItemType = {
        ca_name: values.ca_name,
        ca_desc: values.ca_desc,
        ca_hi: values.ca_hi,
      };
      
      dispatch({
        type: 'CauseEffectSpace/submitCause',
        payload: { id, ...preSubmitCause },
      });

      setCauseDone(true);
    };


    /** Effect Related Actions */
    /** ------------------------------------------------------------------------ */
    const [effectDone, setEffectDone] = useState<boolean>(false);
    const [effectVisible, setEffectVisible] = useState<boolean>(false);
    const [effectCurrent, setEffectCurrent] = useState<Partial<EffectItemType> | undefined>(undefined);
    
    const showEffectModal = () => {
      let item: EffectItemType = {};
      if (currentSelect != "all") {
        item = {
          ef_hi: currentSelect,
        }
      }
      setEffectVisible(true);
      setEffectCurrent(item);
    };
  
    const showEffectEditModal = (item: EffectItemType) => {
      setEffectVisible(true);
      setEffectCurrent(item);
    };

    const handleEffectDone = () => {
      setAddBtnblur();
      setEffectDone(false);
      setEffectVisible(false);
    };
  
    const handleEffectCancel = () => {
      setAddBtnblur();
      setEffectVisible(false);
    };
  
    const handleEffectRemove = (pk: string) => {
      if (efcoData) {
        for (let i:number = 0; i < efcoData.length; i++) {
          if (efcoData[i]['efco_ef'].replace(/-/g,"") == pk) {
            dispatch({
              type: 'CauseEffectSpace/removeEffectControl',
              payload: { 
                pk: efcoData[i]['id'],
              },
            });
          }
        }
      }
      dispatch({
        type: 'CauseEffectSpace/removeEffect',
        payload: { pk },
      });
    };

    const handleEffectSubmit = (values: EffectItemType) => {
      let id = effectCurrent ? effectCurrent.id : '';
  
      if (id) {
        id = id.replace(/-/g,"");
      }

      setAddBtnblur();      

      if ((currentSelect == "all") || (!currentSelect)){
        for (let i: number = 0; i < efData!.length; i++) {
          if (efData![i]['id'] == currentFormID) {         
            setCurrentSelect(efData[i]['ef_hi']);
          }
        }
      }

      let preSubmitEffect: EffectItemType = {
        ef_name: values.ef_name,
        ef_desc: values.ef_desc,
        ef_hi: values.ef_hi,
      };
        
      dispatch({
        type: 'CauseEffectSpace/submitEffect',
        payload: { id, ...preSubmitEffect },
      });

      setEffectDone(true);
    };

    /** Fetch the requested Hazard Instance ID */
    const getPageQuery = () => parse(window.location.href.split('?')[1]);
    let currentHazardInstanceID = getPageQuery().pk;
    const [form] = Form.useForm();

    useEffect(() => {
      dispatch({
        type: 'CauseEffectSpace/fetchCause',
        payload: {
        },
      });

      dispatch({
        type: 'CauseEffectSpace/fetchEffect',
        payload: {
        },
      });
      
      dispatch({
        type: 'EditHazardInstanceSpace/fetchHazardInstance',
        payload: {
        },
      }).then((data: HazardInstanceItemType[]) => {
        //console.log(data)
        console.log(currentHazardInstanceID);
        console.log(data);
        if (currentHazardInstanceID) {
          setCurrentSelect(currentHazardInstanceID);
          form.setFieldsValue({
            pk: currentHazardInstanceID,
          });
          FilterCauseEffect(currentHazardInstanceID);
        }
      });
    }, []);

    /** Cause Control Expanded */
    const cause_control_columns = [
      {
        title: 'Control Name',
        dataIndex: 'caco_name',
      },
      {
        title: 'Description',
        dataIndex: 'caco_desc',
      },
      {
        title: 'State',
        dataIndex: 'caco_state',
        defaultSortOrder: 'descend',
        render: (_: React.ReactNode, record: CauseControlItemType) => {        
          let cacoStateData: string = record.caco_state;
          let color: string = '#f50';
          if (cacoStateData == 'additional') {
            color = '#87d068';
          }
          return (
            <>
              <Tag color={color} key={cacoStateData}>
                {cacoStateData.toUpperCase()}
              </Tag>
            </>
          )
        }
      },
      {
        title: 'Type',
        dataIndex: 'caco_type',
        render: (_: React.ReactNode, record: CauseControlItemType) => {
          let cacoTypeData = [];
          cacoTypeData = record.caco_type.split(';');
          for (let j:number = 0; j < cacoTypeData.length; j++) {
            if (cacoTypeData[j].length < 4) {
              cacoTypeData.splice(j, 1);
            }
          }
          return (
            <>
            {cacoTypeData.map(tag => {
              console.log(tag);
              let color = 'green';
              if (tag == 'design') {
                color = 'volcano';
              }
              if (tag == 'test') {
                color = 'purple';
              }
              if (tag == 'training') {
                color = 'blue';
              }
              if (tag != '') {
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              } else {
                return (
                  <>
                  </>
                )
              }

            })}
            </>
          )
        }
      },
      {
        title: 'Action',
        dataIndex: 'option',
        valueType: 'option',
        render: (_: React.ReactNode, record: CauseControlItemType) => (
          <>
              <a
                onClick={() => {
                  setCurrentFormID(record.id);
                  showCauseControlEditModal(record);
                }}
              >
                Edit
              </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                handleCauseControlRemove(record.id.replace(/-/g,""));
                
                window.location.reload();
              }}
            >
            Remove
            </a>
          </>
        ),
      },
    ];

    // Expanded Cause Control Table
    const expandedCauseRender = (values) => {      
      let cacoExpandedData: CauseControlItemType[] = [];
      if (cacoData) {
        for (let i:number = 0; i < cacoData.length; i++) {
          if (cacoData[i]['caco_ca'] == values.id) {
            cacoExpandedData.push(cacoData[i]);
          }
        }
      }
      //console.log(values);
      return <Table columns={cause_control_columns} rowKey="id" dataSource={cacoExpandedData} pagination={false} />;
    };


    /** Effect Control Expanded */
    const effect_control_columns = [
      {
        title: 'Control Name',
        dataIndex: 'efco_name',
      },
      {
        title: 'Description',
        dataIndex: 'efco_desc',
      },
      {
        title: 'State',
        dataIndex: 'efco_state',        
        render: (_: React.ReactNode, record: EffectControlItemType) => {        
          let efcoStateData: string = record.efco_state;
          let color: string = '#f50';
          if (efcoStateData == 'additional') {
            color = '#87d068';
          }
          return (
            <>
              <Tag color={color} key={efcoStateData}>
                {efcoStateData.toUpperCase()}
              </Tag>
            </>
          )
        }
      },
      {
        title: 'Type',
        dataIndex: 'efco_type',
        render: (_: React.ReactNode, record: EffectControlItemType) => {
          let efcoTypeData = [];
          efcoTypeData = record.efco_type.split(';');
          for (let j:number = 0; j < efcoTypeData.length; j++) {
            if (efcoTypeData[j].length < 4) {
              efcoTypeData.splice(j, 1);
            }
          }
          return (
            <>
            {efcoTypeData.map(tag => {
              console.log(tag);
              let color = 'green';
              if (tag == 'design') {
                color = 'volcano';
              }
              if (tag == 'test') {
                color = 'purple';
              }
              if (tag == 'training') {
                color = 'blue';
              }
              if (tag != '') {
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              } else {
                return (
                  <>
                  </>
                )
              }
            })}
            </>
          )
        }
      },
      {
        title: 'Action',
        dataIndex: 'option',
        valueType: 'option',
        render: (_: React.ReactNode, record: EffectControlItemType) => (
          <>
              <a
                onClick={() => {
                  setCurrentFormID(record.id);
                  showEffectControlEditModal(record);
                }}
              >
                Edit
              </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                handleEffectControlRemove(record.id.replace(/-/g,""));
                window.location.reload();
              }}
            >
            Remove
            </a>
          </>
        ),
      },
    ];
    
    const expandedEffectRender = (values) => {      
      let efcoExpandedData: EffectControlItemType[] = [];
      if (efcoData) {
        for (let i:number = 0; i < efcoData.length; i++) {
          if (efcoData[i]['efco_ef'] == values.id) {
            efcoExpandedData.push(efcoData[i]);
          }
        }
      }
      //console.log(values);
      return <Table columns={effect_control_columns} rowKey="id" dataSource={efcoExpandedData} pagination={false} />;
    };

    const cause_columns = [
      {
        title: 'Name',
        dataIndex: 'ca_name',
      },
      {
        title: 'Description',
        dataIndex: 'ca_desc',
      },
      {
        title: 'Action',
        dataIndex: 'option',
        valueType: 'option',
        render: (_: React.ReactNode, record: CauseItemType) => (
          <>
              <a                
                onClick={() => {
                  setCurrentFormID(record.id);
                  showCauseEditModal(record);
                }}
              >
                Edit
              </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                handleCauseRemove(record.id.replace(/-/g,""));                
                if (currentSelect == "all") {
                  window.location.reload();
                } else {
                  //onDone;
                  history.push({
                    pathname: '/hazardexplorer/causeeffect/',
                    query: {
                      pk: currentSelect,
                    },
                  })
                  window.location.reload();
                }
                //window.location.reload();
              }}
            >
            Remove
            </a>
          </>
        ),
      },
    ];

    const effect_columns = [
      {
        title: 'Name',
        dataIndex: 'ef_name',
      },
      {
        title: 'Description',
        dataIndex: 'ef_desc',
      },
      {
        title: 'Action',
        dataIndex: 'option',
        valueType: 'option',
        render: (_: React.ReactNode, record: EffectItemType) => (
          <>
              <a
                onClick={() => {
                  setCurrentFormID(record.id);
                  showEffectEditModal(record);
                }}
              >
                Edit
              </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                handleEffectRemove(record.id.replace(/-/g,""));
                //FilterCauseEffect(currentSelect);
                if (currentSelect == "all") {
                  window.location.reload();
                } else {
                  //onDone;
                  history.push({
                    pathname: '/hazardexplorer/causeeffect/',
                    query: {
                      pk: currentSelect,
                    },
                  })
                  window.location.reload();
                }
                //window.location.reload();
              }}
            >
            Remove
            </a>
          </>
        ),
      },
    ];
    
  return (

    <PageHeaderWrapper>
      <Card>
        <Card
          title="Select Hazard Instance"
          bordered={false}
        >
          <Row>
            <Col>
              <Form
                form={form}
              >
                <Form.Item
                  label="Hazard Instance"
                  name="pk"
                >
                  <Select
                    defaultValue={currentSelect}
                    style={{ width: 320 }}
                    placeholder="Please select"
                    onChange={handleMenuChange.bind(this)}
                  >
                    <Option value="all" key="allmenu">Select A Process System</Option>
                    {
                      hiData!.map( (hi) => (
                        <Option key={hi.pk} value={hi.pk}>{hi.hi_name}</Option>)
                      )
                    }
                  </Select>
                </Form.Item>
              </Form>

            </Col>
          </Row>
        </Card>
        
        <Card
          bordered={false}
          title="Cause"
        >
          <Row gutter={[10, 10]} justify="end">
            <Col span={4}>
              <Button
                type="primary"
                onClick={showCauseModal}
              >
                New Cause
              </Button>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={showCauseControlModal}
              >
                New Cause Control
              </Button>
            </Col>
          </Row>
    
          <Row gutter={24}>
            <Col span={24}>
              <Table                  
                columns={cause_columns}
                dataSource={caData}
                rowKey="id"
                pagination={false}                 
                expandable={{ expandedRowRender: record => expandedCauseRender(record) }}
              />              
            </Col>
          </Row>
        </Card>
    
        <Card
          bordered={false}
          title="Effect"
        >
          <Row gutter={[10, 10]} justify="end">
            <Col span={4}>
              <Button
                type="primary"
                onClick={showEffectModal}
              >
                New Effect
              </Button>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={showEffectControlModal}
              >
                New Effect Control
              </Button>
            </Col>
          </Row>
    
          <Row gutter={24}>
            <Col span={24}>
              <Table
                columns={effect_columns}
                dataSource={efData}
                pagination={false}
                rowKey="id"
                expandable={{ expandedRowRender: record => expandedEffectRender(record) }}
              />            
            </Col>
          </Row>
        </Card>
      </Card>

      <EffectAction
        hazardinstanceData={hazardinstanceData}
        done={effectDone}
        current={effectCurrent}
        visible={effectVisible}
        onDone={handleEffectDone}
        onCancel={handleEffectCancel}
        onSubmit={handleEffectSubmit}
        currentSelect={currentSelect}
      />

      <CauseAction
        done={causeDone}
        current={causeCurrent}
        visible={causeVisible}
        onDone={handleCauseDone}
        onCancel={handleCauseCancel}
        onSubmit={handleCauseSubmit}
        currentSelect={currentSelect}
      />

      <CauseControlAction
        done={causecontrolDone}
        current={causecontrolCurrent}
        visible={causecontrolVisible}
        onDone={handleCauseControlDone}
        onCancel={handleCauseControlCancel}
        onSubmit={handleCauseControlSubmit}
        associatedHazardInstance={currentSelect}
        ahi={caData}
        currentSelect={currentSelect}
      />

      <EffectControlAction
        done={effectcontrolDone}
        current={effectcontrolCurrent}
        visible={effectcontrolVisible}
        onDone={handleEffectControlDone}
        onCancel={handleEffectControlCancel}
        onSubmit={handleEffectControlSubmit}
        associatedHazardInstance={currentSelect}
        ehi={efData}
        currentSelect={currentSelect}
      />
    </PageHeaderWrapper>


  );
};

export default connect (
  ({
    EditHazardInstanceSpace,
    CauseEffectSpace,
  }: {
    CauseEffectSpace: CauseEffectState;
    EditHazardInstanceSpace: EditHazardInstanceState;
  }) => ({
    CauseEffectSpace,
    EditHazardInstanceSpace,
  }),

)(CauseEffect);