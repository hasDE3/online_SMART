/**
 * 'AddSystemFunction.tsx' defines the 'Add System Function' button in the 'SystemFunctionAssociation.tsx'
 * 
 */

import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { SystemFunctionItemType, SystemItemType } from '../data';

const FormItem = Form.Item;
const { TextArea } = Input;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: SystemFunctionItemType) => void;
  onCancel: () => void;
  systemData: SystemItemType[];
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleSystemFunctionAdd, onCancel, systemData } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleSystemFunctionAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="Add New System Function"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="Name"
          name="sf_name"
          rules={[{ required: true, message: 'System Function Name', min: 2 }]}
        >
          <Input placeholder="Input"/>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15}}
          label="Description"
          name="sf_desc"
          //rules={[{ required: true, message: 'Please enter the description.', min: 5 }]}
          >
          <TextArea rows={4} placeholder="System Function Description" />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15}}
          label="System"
          name="sf_parent"
        >
          <Select
            placeholder="Please select"
          >
            <Select.Option value="all">All</Select.Option>
            {
              systemData.map( (md) => (
                <Select.Option key={md.pk} value={md.pk}>{md.sy_name}</Select.Option>)
              )
            }
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
