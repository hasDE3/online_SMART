/**
 * 'CreateForm.tsx' deinfes the function that creating new System.
 */

import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { 
                            sy_name: string,
                            sy_desc: string, }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="Add New System"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="Name"
          name="sy_name"
          rules={[{ required: true, message: 'System Name', min: 1 }]}
        >
          <Input placeholder="Input"/>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15}}
          label="Description"
          name="sy_desc"
          //rules={[{ required: true, message: 'Please enter the description.', min: 5 }]}
          >
          <TextArea rows={4} placeholder="System Description" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
