import React from 'react';
import { Form, Input, Modal } from 'antd';
import { ReportItemType } from '../data.d';
const FormItem = Form.Item;

interface CreateReportProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: ReportItemType) => void;
  onCancel: () => void;
}

const CreateReport: React.FC<CreateReportProps> = (props) => {
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
      title="New Report"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="Name"
          name="re_name"
          rules={[{ required: true, min: 2 }]}
        >
          <Input placeholder="Name"/>
        </FormItem>
        
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="Description"
          name="re_desc"        
        >
          <Input placeholder="Description" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateReport;