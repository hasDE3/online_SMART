/** 
 * Care Setting management.
 * The structure has considered the Ant Design Pro's official example.
 * 
 */

import { Button, Divider, message, Modal, Card } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem, ProcessNodeItemType } from './data.d';
import { queryItem, updateItem, addItem, removeItem } from './service';
import { connect, Dispatch } from 'umi';
import { CareSettingPNState } from './model';
interface CareSettingProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  CareSettingPNSpace: CareSettingPNState;
}

/**
 * Add New Item
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('Adding');
  try {
    await addItem({
      cs_name: fields.cs_name,
      cs_desc: fields.cs_desc,
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
 * Update Item
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Updating');
  try {
    await updateItem({
      id: fields.pk,
      cs_name: fields.cs_name,
      cs_desc: fields.cs_desc,
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

/**
 * Function component in React
 */
const TableList: React.FC<CareSettingProps> = ({
   dispatch,
   CareSettingPNSpace: { pnData }, }) => {

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'cs_name',
    },
    {
      title: 'Description',
      dataIndex: 'cs_desc',
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
              handleUpdateModalVisible(true);
              /**console.log(record);*/
              setStepFormValues(record);
            }}
          >
            Edit
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove(record);
              // Refresh Current Page
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
          Remove
          </a>
        </>
      ),
    },
  ];

  const handleRemove = async (fields: FormValueType) => {
    const hide = message.loading('Deleting');
    let tempProcessNode: ProcessNodeItemType = {
      //pn_cs: fields.pk.replace(/-/g,""),
      pn_cs: fields.pk,
    };

    dispatch({
      type: 'CareSettingPNSpace/updateProcessNodeCS',
      payload: {
        ...tempProcessNode
      },
    });

    try {
      await removeItem({
        id: fields.pk,
      });
      hide();

      // TODO
      // Could have a better solution
      message.success('Successfully Deleted');
      window.location.reload();

      return true;
    } catch (error) {
      hide();
      message.error('Delete Failed');
      return false;
    }
  };

  return (
    <PageHeaderWrapper>
      <Card
        title="Care Setting Selection"
      >     
        <ProTable <TableListItem>
          TableItemProps="Please Input"
          pagination = {{
            simple: true,
            showSizeChanger: false,
            showQuickJumper: false,
          }}

          search={false}
          options={{fullScreen: false, reload:false, setting: false}}
          actionRef={actionRef}
          rowKey="pk"
          toolBarRender={(action, { selectedRows }) => [
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              Add New
            </Button>,
          ]}
          request={(params) => queryItem(params)}
          columns={columns}

        />
        <CreateForm
          onSubmit={async (value: {cs_desc: string}) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async (value) => {
              const success = await handleUpdate(value);
              if (success) {
                handleModalVisible(false);
                setStepFormValues({});
                if (actionRef.current) {
                  actionRef.current.reload();
                }
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
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    CareSettingPNSpace,
  }: {
    CareSettingPNSpace: CareSettingPNState;
  }) => ({
    CareSettingPNSpace,
  }),
)(TableList);
