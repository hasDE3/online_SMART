import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { 
                            il_name: string,
                            il_desc: string, }) => void;
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
      title="Add New Issue Log"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="Name"
          name="il_name"
          rules={[{ required: true, message: 'Please enter the name.', min: 5 }]}
        >
          <Input placeholder="Input"/>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15}}
          label="Description"
          name="il_desc"
          //rules={[{ required: true, message: 'Please enter the description.', min: 5 }]}
          >
          <TextArea rows={4} placeholder="Please enter at least five words." />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
