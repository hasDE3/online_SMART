/** 
 *  System Function Page.
 *  Dva Model is used to deal with System Function CRUD.
 *  System CRUD uses another way which is similar with the 'Care Setting' Page.
 *  The 'System deletion' function will check if there are associated 'System Functions'.
 *  This approach is archived through the back-end program.
 *  The default value of the Selector is "All".
 *  The initial value of the System Function list is "fetching all system function".
 * 
 */

import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Descriptions, Card, Col, Form, Divider, Table, Row, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { connect, Dispatch, history } from 'umi';
import { ListState } from './models/SystemFunction';
import { MenuState } from './models/SystemModel';
import { MenuDescriptionState } from './models/GetSystemDescription';
import { ListItemDataType, MenuItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import UpdateSystem from './components/UpdateSystem';
import styles from './style.less';
import CreateForm from './components/CreateForm';
import { addSystem, updateSystem, removeSystem } from './service';
import CreateSystemFunction from './components/CreateSystemFunction';
import { findDOMNode } from 'react-dom';
import DescriptionsItem from 'antd/lib/descriptions/Item';
const FormItem = Form.Item;
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { parse } from 'querystring';

let currentSelect: string = "all";
/**
 * Add New System
 */
const handleAdd = async (fields: MenuItemDataType) => {
  const hide = message.loading('Adding');
  try {
    await addSystem({
      sy_name: fields.sy_name,
      sy_desc: fields.sy_desc,
    });
    hide();
    message.success('Successfully Added');
    return true;
  } catch (error) {
    hide();
    message.error('Add Failed');
    return false;
  }
};

/**
 * Update System
 */
const handleUpdate = async (fields: MenuItemDataType) => {
  const hide = message.loading('Updating');
  try {
    await updateSystem({
      id: fields.pk,
      sy_name: fields.sy_name,
      sy_desc: fields.sy_desc,
    });
    hide();

    message.success('Successfully Configured');
    return true;

  } catch (error) {
    hide();
    message.error('Configure Failed');
    return false;
  }
};

const handleSystemRemove = async (fields: MenuItemDataType) => {
  const hide = message.loading('Deleting');
  /**
  let dd:string = "";
  if (fields.pk) {
    dd = fields.pk.replace(/-/g,"");
  } else {
    dd = currentSelect.replace(/-/g,"");
  }
  */

  let dd:string = currentSelect.replace(/-/g,"");
  try {
    await removeSystem({
      id: dd,
    });
    hide();
    message.success('Successfully Deleted');
    history.push({
      pathname: '/SystemFunction/',
      query: {
      },
    })
    window.location.reload();
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please make sure there is no associated System Function');
    return false;
  }
};

interface SystemfunctionProps {
  dispatch: Dispatch<any>;
  SystemSpace: ListState;
  MenuDescriptionSpace: MenuDescriptionState;
  MenuSpace: MenuState;
  loading: boolean;
  selectAll: boolean;
}
let selectAll: boolean = true;

const Systemfunction: FC<SystemfunctionProps> = ({
  dispatch,
  SystemSpace: { listData },
  MenuSpace: { menuData },
  MenuDescriptionSpace: { menuDescription },
  loading,
}) => {

  const [form] = Form.useForm();
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<ListItemDataType> | undefined>(undefined);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  let requestSystemID:string = "";

  const [, forceUpdate] = useState();

  // To disable 'edit' and 'remove' button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const FilterSystemFunction = (filter: string) => {
    dispatch({
      type: 'SystemSpace/fetchList',
      // Here the payload param will be transformed to 'effect'
      payload: {
        sf_parent: filter,
      },
    });
  }

  const FetchAllSystemFunction = () => {
    dispatch({
      type: 'SystemSpace/fetchList',
      payload: {

      },
    });
  }

  const FetchSystemDescription = (pk: string) => {
    dispatch({
      type: 'MenuDescriptionSpace/fetchMenuDescription',
      // Here the payload param will be transformed to 'effect'
      payload: {
        pk,
      },
    });
  }

  useEffect(() => {

    // If there is a System ID in the URL
    const getPageQuery = () => parse(window.location.href.split('?')[1]);

    if (getPageQuery().pk) {
      currentSelect = getPageQuery().pk;
      form.setFieldsValue({
        sy_select: currentSelect,
      });
    }

    if (currentSelect === "all") {
      dispatch({
        type: 'SystemSpace/fetchList',
        payload: {
        },
      });
      selectAll = true;
    } else {
      dispatch({
        type: 'SystemSpace/fetchList',
        // Here the payload param will be transformed to 'effect'
        payload: {
          sf_parent: currentSelect.replace(/-/g,""),
        },
      });
      selectAll = false;
    }

  }, []); 

  useEffect(() => {
    dispatch({
      type: 'MenuSpace/fetchMenu',
      payload: {
      },
    });
  }, []);

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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

  const handleRemove = (id: string) => {
    dispatch({
      type: 'SystemSpace/removeList',
      payload: { id },
    });
  };

  const showEditModal = (item: ListItemDataType) => {
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

  const handleSubmit = (values: ListItemDataType) => {
    const id = current ? current.pk : '';

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: 'SystemSpace/submitList',
      payload: { id, ...values },
    });

    if (currentSelect == "all") {      
      window.location.reload();
    } else {    
      history.push({
        pathname: '/SystemFunction/',
        query: {
          pk: currentSelect,
        },
      })
      window.location.reload();
    }

  };

  let currentMenu: MenuItemDataType = menuDescription[0];
  let defaultMenu: MenuItemDataType = menuData[0];
  // let defaultMenuText: string = defaultMenu.pk;

  const handleMenuChange = (value: string) => {
    currentSelect = value;    
    // Replace '-' to match the UUID type in backend database
    requestSystemID = value.replace(/-/g,"");    
    if (requestSystemID === "all") {

      window.location.reload();
      FetchAllSystemFunction();
      selectAll = true;
    } else {
      FilterSystemFunction(requestSystemID);
      FetchSystemDescription(requestSystemID);
      selectAll = false;
      //console.log(defaultMenu.pk);
    }

    currentMenu = menuDescription[0];
    //console.log(currentMenu);

  }

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'sf_name',
    },
    {
      title: 'Description',
      dataIndex: 'sf_desc',
      valueType: 'textarea',
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              showEditModal(record);
            }}
          >
            Edit
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove(record.pk.replace(/-/g,""));
              if (currentSelect == "all") {
                window.location.reload();
              } else {
                history.push({
                  pathname: '/SystemFunction/',
                  query: {
                    pk: currentSelect,
                  },
                })
                window.location.reload();
              }
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
      <Card bordered={false} title="System">
        <Form
          layout="inline"
          form={form}
          onValuesChange={() => {
            dispatch({
              type: 'SystemSpace/fetchSystemFunction',
              payload: {
              },
            });
          }}
        >

          <StandardFormRow title="Select System" grid last>
            <Row gutter={[16, 16]} justify="space-around">
              <Col span={12}>
                <FormItem {...formItemLayout} name="sy_select" initialValue={currentSelect}>
                  <Select
                    //defaultValue={currentSelect}
                    style={{ width: 200 }}
                    placeholder="Please select"
                    onChange={handleMenuChange.bind(this)}
                  >
                    <Select.Option value="all">All System Function(s)</Select.Option>
                    {
                      menuData.map( (md) => (
                        <Select.Option key={md.pk} value={md.pk}>{md.sy_name}</Select.Option>)
                      )
                    }
                  </Select>
                </FormItem>
              </Col>

              <Col>
                <FormItem {...formItemLayout} name="action">
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={() => handleModalVisible(true)}
                  >New System
                  </Button>
                </FormItem>

                <CreateForm
                  onSubmit={async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                      handleModalVisible(false);
                      window.location.reload();
                    }
                  }}
                  onCancel={() => handleModalVisible(false)}
                  modalVisible={createModalVisible}
                />
                {stepFormValues && Object.keys(stepFormValues).length ? (
                  <UpdateSystem
                    onSubmit={async (value) => {
                      const success = await handleUpdate(value);
                      if (success) {
                        handleModalVisible(false);
                        setStepFormValues({});
                        window.location.reload();
                      }
                    }}
                    onCancel={() => {
                      handleUpdateModalVisible(false);
                      setStepFormValues({});
                    }}
                    updateModalVisible={updateModalVisible}
                    values={stepFormValues}
                  />
                ) : null}
              </Col>

              <Col>
                <FormItem {...formItemLayout} shouldUpdate>
                  {()=>{
                    return (
                      <Button
                        icon={<EditOutlined />}
                        disabled={selectAll}
                        onClick={() => {
                          handleUpdateModalVisible(true);
                          setStepFormValues(currentMenu);
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
                        icon={<DeleteOutlined />}
                        disabled={selectAll}
                        onClick={() => {
                          handleSystemRemove(currentMenu);
                        }}
                      >Delete
                      </Button>
                    );
                  }}

                </FormItem>
              </Col>
            </Row>
          </StandardFormRow >

          <StandardFormRow title="System Description " grid last>
            <Row gutter={16} >
              <Descriptions>
                {
                  menuDescription.map( (md) => (
                    <DescriptionsItem span={3} key={md.pk}> {md.sy_desc} </DescriptionsItem>)
                  )
                }
              </Descriptions>
            </Row>
          </StandardFormRow>

        </Form>
      </Card>

      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
        title="System Function"
      >
        <Row gutter={[16, 24]} justify="end">
          <Col>
            <Button
              type="primary"
              onClick={showModal}
              ref={addBtn}
              icon={<FormOutlined />}
            >
              New System Function
            </Button>

          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table
              dataSource={listData}
              columns={columns}
              rowKey="pk"
            />

          </Col>
        </Row>
      </Card>

      <CreateSystemFunction
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        currentSelect={currentSelect}
      />
    </PageHeaderWrapper>

  );
};

export default connect(
  ({
    SystemSpace,
    MenuSpace,
    MenuDescriptionSpace,
    loading,
  }: {
    SystemSpace: ListState;
    MenuSpace: MenuState;
    MenuDescriptionSpace: MenuDescriptionState;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    SystemSpace,
    MenuSpace,
    MenuDescriptionSpace,
    loading: loading.models.SystemSpace,
  }),
)(Systemfunction);
