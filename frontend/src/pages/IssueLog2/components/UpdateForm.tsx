import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  const [formVals, setFormVals] = useState<FormValueType>({
    pk: props.values.pk,
    il_name: props.values.il_name,
    il_desc: props.values.il_desc,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    //setFormVals({...fieldsValue});
    //setFormVals({ ...formVals, ...fieldsValue });
    formVals.il_name = fieldsValue.il_name;
    formVals.il_desc = fieldsValue.il_desc;
    
    handleUpdate(formVals);
  };

  const renderContent = () => {
    return (
      <>
 
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          name="il_name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name', min: 5 }]}
        >
          <Input placeholder="Input" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          name="il_desc"
          label="Description"
          //rules={[{ required: true, message: 'Please enter the description.', min: 5 }]}
        >
          <TextArea rows={4} placeholder="Please enter at least five words." />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancel</Button>
        <Button type="primary" onClick={() => handleSubmit()}>
          Update
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Edit Issue Log"
      visible={updateModalVisible}
      footer={renderFooter()}
      //onCancel={() => handleUpdateModalVisible() }
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          //pk: formVals.pk,
          il_name: formVals.il_name,
          il_desc: formVals.il_desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;