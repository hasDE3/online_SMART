/** 
 * Issue log management.
 * The structure of this component is the same as the care setting management.
 * The first demo of issue log was written in 06/2020.
 *
 */
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Card } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryItem, updateItem, addItem, removeItem } from './service';

/**
 * Add New Item
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('Adding');
  try {
    await addItem({
      il_index: fields.il_index,
      il_name: fields.il_name,
      il_desc: fields.il_desc,
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
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Updating');
  try {
    await updateItem({
      id: fields.pk,
      il_index: fields.il_index,
      il_name: fields.il_name,
      il_desc: fields.il_desc,
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
 *  Delete
 * @param selectedRows
 */
const handleRemove = async (fields: FormValueType) => {
  const hide = message.loading('Deleting');
  try {
    await removeItem({
      id: fields.pk,
    });
    hide();
    message.success('Successfully Deleted');
    return true;
  } catch (error) {
    hide();
    message.error('Delete Failed');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'il_name',
    },
    {
      title: 'Description',
      dataIndex: 'il_desc',
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

  return (
    <PageHeaderWrapper>
      <Card
        title="Issue Selection"
      >

        <ProTable<TableListItem>
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
            <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
              Add New
            </Button>,
          ]}
          request={(params) => queryItem(params)}
          columns={columns}

        />
        <CreateForm
          onSubmit={async (value: {il_desc: string}) => {
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

export default TableList;
