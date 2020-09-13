/**
 * 'UpdateSystem.tsx' deinfes the function that updating existing System.
 *
 */
import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

import { MenuItemDataType } from '../data.d';

export interface FormValueType extends Partial<MenuItemDataType> {
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<MenuItemDataType>;
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

const UpdateSystem: React.FC<UpdateFormProps> = (props) => {

  const [formVals, setFormVals] = useState<FormValueType>({
    pk: props.values.pk,
    sy_name: props.values.sy_name,
    sy_desc: props.values.sy_desc,
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
    formVals.sy_name = fieldsValue.sy_name;
    formVals.sy_desc = fieldsValue.sy_desc;
    
    handleUpdate(formVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          name="sy_name"
          label="Name"
          rules={[{ required: true, message: 'System Name'}]}
        >
          <Input placeholder="Input" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          name="sy_desc"
          label="Description"
          //rules={[{ required: true, message: 'Please enter the description.', min: 5 }]}
        >
          <TextArea rows={4} placeholder="System Description" />
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
      title="Edit System"
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
          pk: formVals.pk,
        	sy_name: formVals.sy_name,
          sy_desc: formVals.sy_desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateSystem;
