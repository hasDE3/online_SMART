/** 
 * Hazard Instance/Type Explorer.
 * 'Add New Hazard Instance' & 'Edit Hazard Instance' are written in separate pages.
 * Bowtie Graph component - './components/Bowtie.tsx'.
 */

import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Descriptions, Card, Col, Form, Divider, Table, Row, Select, message, Badge, Tag, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import HazardTypeAction from './components/HazardTypeAction';
import { connect, Dispatch, Link, history } from 'umi';
import { HazardTypeState } from './models/HazardTypeModel';
import { HazardInstanceState } from './models/HazardInstanceModel';
import { FetchSystemFunctionState } from './models/FetchSystemFunction2';
import { SingleHazardTypeState } from './models/FetchSingleHazardType';
import { HazardInstanceItemType, HazardTypeItemType } from './data.d';
import { findDOMNode } from 'react-dom';
import StandardFormRow from './components/StandardFormRow';
const FormItem = Form.Item;
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { ProcessNodeItemType } from '@/pages/CareSettings/data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import Bowtie from './components/Bowtie';

import { CauseEffectState } from '@/models/CauseEffectModel';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';

let currentHazardFilter: string = "all";

interface HazardExplorerProps {
  dispatch: Dispatch<any>;
  HazardTypeSpace: HazardTypeState;
  HazardInstanceSpace: HazardInstanceState;
  SingleHazardTypeSpace: SingleHazardTypeState;
  FetchSystemFunctionSpace: FetchSystemFunctionState;
  CauseEffectSpace: CauseEffectState;
  loading: boolean;
}

let selectAll:boolean = true;

const HazardExplorer: React.FC<HazardExplorerProps> = ({
  dispatch,
  HazardTypeSpace: { htData },
  HazardInstanceSpace: { hiData },
  SingleHazardTypeSpace: { shtData },
  FetchSystemFunctionSpace: { sfData },
  CauseEffectSpace: { caData, efData, cacoData, efcoData },
  loading,
}) => {

  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<HazardTypeItemType> | undefined>(undefined);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [, forceUpdate] = useState();

  // To disable 'edit' and 'remove' button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    dispatch({
      type: 'HazardTypeSpace/fetchHazardType',
      payload: {
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'CauseEffectSpace/fetchCauseControl',
      payload: {

      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'CauseEffectSpace/fetchCause',
      payload: {
      },
    })
  }, []);

  useEffect(() => {
    dispatch({
      type: 'CauseEffectSpace/fetchEffectControl',
      payload: {

      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'CauseEffectSpace/fetchEffect',
      payload: {
      },
    })
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
    if (currentHazardFilter === "all") {
      dispatch({
        type: 'HazardInstanceSpace/fetchHazardInstance',
        payload: {
        },
      });
    } else {
      dispatch({
        type: 'HazardInstanceSpace/fetchHazardInstance',
        /** Here the payload param will be transformed to 'effect' */
        payload: {
          hi_parent: currentHazardFilter,
        },
      });
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: 'FetchSystemFunctionSpace/fetchSystemFunction',
      payload: {
      },
    });
  }, []);

  const addBtn = useRef(null);
  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  const jumpToEdit = (record: String) => {
    history.push({
      pathname: '/hazardexplorer/editor/',
      query: {
        pk: record,
      },
    })
  }

  const jumpToCauseEffectEdit = (record: String) => {
    history.push({
      pathname: '/hazardexplorer/causeeffect/',
      query: {
        pk: record,
      },
    })
  }

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: HazardTypeItemType) => {
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

  const handleSubmit = (values: HazardTypeItemType) => {
    const id = current ? current.pk : '';

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: 'HazardTypeSpace/submitHazardType',
      payload: { id, ...values },
    });
  };

  const handleRemove = (tw: HazardTypeItemType) => {
    const pk = tw.pk;
    let deletable: boolean = true;
    if (hiData) {
      /** console.log(hiData);*/
      for(let i = 0, len = hiData.length; i < len; i++){
        if (pk === hiData[i].hi_parent) {
          message.error('Delete failed, please make sure there is no associated Hazard Instance');
          deletable = false;
        }
      }
    };
    if (deletable) {
      dispatch({
        type: 'HazardTypeSpace/removeHazardType',
        payload: { pk },
      });
      window.location.reload();
    };
  };

  const FetchAllHazardInstance = () => {
    dispatch({
      type: 'HazardInstanceSpace/fetchHazardInstance',
      payload: {

      },
    });
  }


  const FilterHazardInstance = (filter: string) => {
    dispatch({
      type: 'HazardInstanceSpace/fetchHazardInstance',
      /** Here the payload param will be transformed to 'effect' */
      payload: {
        hi_parent: filter,
      },
    });
  }

  const FetchSingleHazardType = (pk: string) => {
    dispatch({
      type: 'SingleHazardTypeSpace/fetchSingleHazardType',
      payload: {
        pk,
      },
    });
  };

  const handleHazardInstanceRemove = (pk: string) => {
    dispatch({
      type: 'HazardInstanceSpace/removeHazardInstance',
      payload: { pk },
    });
  };

  /** Ensure that the 'Associated System Function' column shows the right System Function name
   *
   */
  const handleSystemFunctionDisplay = (value: string) => {
    for(var i = 0, len = sfData.length; i < len; i++){
      if (value === sfData[i].pk) {
        /**console.log(sfData);*/
        return sfData[i].sf_name
      }
    }
    return ""
  }

  let currentHazardType: HazardTypeItemType = shtData[0];

  let defaultHazardType: HazardTypeItemType = htData[0];
  // let defaultMenuText: string = defaultMenu.pk;
  let requestSystemID:string = "";
  let currentHazardInstance: HazardInstanceItemType;

  const handleMenuChange = (value: string) => {
    currentHazardFilter = value;
    /** Replace '-' to match the UUID type in backend database*/
    requestSystemID = value.replace(/-/g,"");
    if (requestSystemID === "all") {
      FetchAllHazardInstance();
      window.location.reload();
      selectAll = true;
    } else {
      FilterHazardInstance(value);
      FetchSingleHazardType(requestSystemID);
      if (shtData) {
        currentHazardType = shtData[0];
      }
      selectAll = false;
    }
  }

  const colorBadge = (a: number) => {
    if (a === 5) {
      return "red";
    }

    if (a === 4) {
      return "orange";
    }

    if (a === 3) {
      return "gold";
    }

    if (a === 2) {
      return "green";    
    }

    return "blue"
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'hi_name',
    },
    {
      title: 'Associated System Function',
      dataIndex: 'hi_sf',
      render: (text, record) => handleSystemFunctionDisplay(text),

    },
    {
      title: 'Clinical Justification',
      dataIndex: 'hi_clju',
    },
    {
      title: 'Description',
      dataIndex: 'hi_desc',
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      width: 160,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              jumpToCauseEffectEdit(record.pk);
            }}
          >
            Cause and Effect
          </a>

          <Divider type="vertical" />
          <a
            onClick={() => {
              jumpToEdit(record.pk);
            }}
          >
            Edit
          </a>

          <Divider type="vertical" />
          <a
            onClick={() => {
              handleHazardInstanceRemove(record.pk.replace(/-/g,""));
              window.location.reload();
            }}
          >
          Remove
          </a>
        </>
      ),
    },
  ];

  // CAUSE
  // Expanded Cause Control
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
      filters: [
        {
          text: 'Existing',
          value: 'existing',
        },
        {
          text: 'Additional',
          value: 'additional',
        },
      ],
      onFilter: (value, record) => record.caco_state.indexOf(value) === 0,
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
  ];

  // Expanded Cause Control Table
  const expandedCauseControlRender = (values) => {      
    let cacoExpandedData: CauseControlItemType[] = [];
    if (cacoData) {
      for (let i:number = 0; i < cacoData.length; i++) {
        if (cacoData[i]['caco_ca'] == values.id) {
          cacoExpandedData.push(cacoData[i]);
        }
      }
    }
    //console.log(values);
    return (
      <Table 
        columns={cause_control_columns} 
        rowKey="id" 
        dataSource={cacoExpandedData} 
        pagination={false}
        size="small"
      />
    );
  };

  // Expanded Cause
  const cause_columns = [
    {
      title: 'Cause Name',
      dataIndex: 'ca_name',
    },
    {
      title: 'Description',
      dataIndex: 'ca_desc',
    },
  ];


  // EFFECT
  // Expanded Effect Control
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
      filters: [
        {
          text: 'Existing',
          value: 'existing',
        },
        {
          text: 'Additional',
          value: 'additional',
        },
      ],
      onFilter: (value, record) => record.efco_state.indexOf(value) === 0,
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
  ];

  // Expanded Effect Control Table
  const expandedEffectControlRender = (values) => {      
    let efcoExpandedData: EffectControlItemType[] = []; 
    console.log(efcoData);
    if (efcoData) {
      for (let i:number = 0; i < efcoData.length; i++) {
        if (efcoData[i]['efco_ef'] == values.id) {
          efcoExpandedData.push(efcoData[i]);
        }
      }
    }
    //console.log(values);
    console.log(efcoExpandedData);
    return (
      <Table 
        columns={effect_control_columns} 
        rowKey="id" 
        dataSource={efcoExpandedData} 
        pagination={false}
        size="small"
      />
    );
  };

  // Expanded Effect
  const effect_columns = [
    {
      title: 'Effect Name',
      dataIndex: 'ef_name',
    },
    {
      title: 'Description',
      dataIndex: 'ef_desc',
    },
  ];

  const expandedCauseRender = (record: HazardInstanceItemType) => {
    console.log(record);
    let efExpandedData: EffectItemType[] = [];
    let caExpandedData: CauseItemType[] = [];
    if (efData) {
      for (let i:number = 0; i < efData.length; i++) {                
        if (efData[i]['ef_hi'] == record.pk) {
          efExpandedData.push(efData[i]);
        }
      }
    }

    if (caData) {
      for (let i:number = 0; i < caData.length; i++) {                
        if (caData[i]['ca_hi'] == record.pk) {
          caExpandedData.push(caData[i]);
        }
      }
    }
    //console.log(values);
    return (
      <>
        <Row gutter={16}>
          <Col span={24}>
            <Card
              title="Estimation of Clinical Risks"
              //type="inner"
            >
              <Descriptions 
                column={6} 
                bordered
                layout="vertical"
                size="middle"
              >
                <DescriptionsItem label="Initial Severity">
                  <Badge color={colorBadge(record.hi_inse)} style={{ color: colorBadge(record.hi_inse) }} text={record.hi_inse} />
                </DescriptionsItem>

                <DescriptionsItem label="Initial Likelihood">
                  <Badge color={colorBadge(record.hi_inli)} style={{ color: colorBadge(record.hi_inli) }} text={record.hi_inli} />
                </DescriptionsItem>

                <DescriptionsItem label="Initial Risk Rating">
                  <Badge color={colorBadge(record.hi_inrr)} style={{ color: colorBadge(record.hi_inrr) }} text={record.hi_inrr} />
                </DescriptionsItem>

                <DescriptionsItem label="Residual Severity">
                  <Badge color={colorBadge(record.hi_rese)} style={{ color: colorBadge(record.hi_rese) }} text={record.hi_rese} />
                </DescriptionsItem>                    

                <DescriptionsItem label="Residual Likelihood">
                  <Badge color={colorBadge(record.hi_reli)} style={{ color: colorBadge(record.hi_reli) }} text={record.hi_reli} />
                </DescriptionsItem>                    

                <DescriptionsItem label="Residual Risk Rating">
                  <Badge color={colorBadge(record.hi_rerr)} style={{ color: colorBadge(record.hi_rerr) }} text={record.hi_rerr} />
                </DescriptionsItem>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
            >
              <TabPane 
                tab="Cause & Effect Table" 
                key="1"
              >
                <Card
                  title="Cause and Effect"
                >
                  <Table 
                    style={{ marginTop: 8 }}
                    columns={cause_columns}
                    rowKey="id" 
                    dataSource={caExpandedData} 
                    pagination={false}
                    bordered
                    expandable={{ expandedRowRender: record => expandedCauseControlRender(record) }}
                  />

                  <Table 
                    style={{ marginTop: 8 }}
                    columns={effect_columns}
                    rowKey="id" 
                    dataSource={efExpandedData} 
                    pagination={false}
                    bordered
                    expandable={{ expandedRowRender: record => expandedEffectControlRender(record) }}
                  />
                </Card>
              </TabPane>
              <TabPane
                tab="Graph"
                key="2"
              >
                <Bowtie
                  record={record}
                />
              </TabPane>
            </Tabs>

          </Col>
        </Row>
      </>
    );
  };

  return (
    <PageHeaderWrapper>
      <Card
        bordered={false}
        title="Hazard Type"
      >
        <Form
          layout="inline"
          form={form}
        >
          <StandardFormRow title="Select Hazard Type" grid last>
            <Row gutter={[16, 16]} justify="space-around">
              <Col span={12}>
                <Select
                  defaultValue={currentHazardFilter}
                  style={{ width: 300 }}
                  placeholder="Please select"
                  onChange={handleMenuChange.bind(this)}
                  /**onSelect={handleMenuChange.bind(this)}*/
                >
                  <Option value="all" >All Hazard Instance(s)</Option>
                  {
                    htData.map( (ht) => (
                      <Option key={ht.pk} value={ht.pk}>{ht.ht_name}</Option>)
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
                  >New Hazard Type
                  </Button>
                </FormItem>
              </Col>

              <Col>
                <FormItem {...formItemLayout} shouldUpdate>
                  {()=>{
                    return (
                      <Button
                        disabled={selectAll}
                        icon={<EditOutlined />}
                        onClick={() => {
                          showEditModal(currentHazardType);
                        }}
                      >Edit
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
                        disabled={selectAll}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          handleRemove(currentHazardType);
                        }}
                      >Delete
                      </Button>
                    );
                  }}
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow >

          <StandardFormRow title="Hazard Type Description " grid last>
          <Row gutter={16} >
            <Descriptions>
              {
                shtData.map( (md) => (
                  <DescriptionsItem span={3} key={md.pk}> {md.ht_desc} </DescriptionsItem>)
                )
              }
            </Descriptions>
          </Row>
        </StandardFormRow>

        </Form>
      </Card>

      <Card
        bordered={false}
        style={{ marginTop: 24 }}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
        title="Hazard Instance"
      >
        <Row gutter={[16, 24]} justify="end">
          <Col>
            <Link to="/hazardexplorer/new">
              <Button
                type="primary"
                onClick={showModal}
                ref={addBtn}
                icon={<FormOutlined />}
              >
                New Hazard Instance
              </Button>
            </Link>

          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              rowKey="pk"
              /**expandable={{expandedRowRender}}*/
              expandable={{ expandedRowRender: record => expandedCauseRender(record) }}
              dataSource={ hiData }
            />
          </Col>
        </Row>
      </Card>

      <HazardTypeAction
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
    SingleHazardTypeSpace,
    FetchSystemFunctionSpace,
    HazardInstanceSpace,
    HazardTypeSpace,
    CauseEffectSpace,
    loading,
  }: {
    SingleHazardTypeSpace: SingleHazardTypeState;
    FetchSystemFunctionSpace: FetchSystemFunctionState;
    HazardInstanceSpace: HazardInstanceState;
    HazardTypeSpace: HazardTypeState;
    CauseEffectSpace: CauseEffectState;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    SingleHazardTypeSpace,
    FetchSystemFunctionSpace,
    HazardInstanceSpace,
    HazardTypeSpace,
    CauseEffectSpace,
    loading: loading.models.HazardTypeSpace,
  }),
)(HazardExplorer);
