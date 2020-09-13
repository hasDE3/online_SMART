/**
 * 'UpdateForm.tsx' defines the function that updating existing care setting.
 */

import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

import { TableListItem } from '../data.d';

/**
 * Modified from Ant Design Pro's official example.
 * Some unused functions could be optimized.
 * Now all the functions work.
 */
export interface FormValueType extends Partial<TableListItem> {
  //pk: number;
  //cs_index?: string;
  //cs_name?: string;
  //cs_desc?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  //onSubmit: (fieldsValue: { 
//                            cs_index: string,
                            //cs_name: string,
                            //cs_desc: string,}) => void;
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
    cs_name: props.values.cs_name,
    cs_desc: props.values.cs_desc,
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
    formVals.cs_name = fieldsValue.cs_name;
    formVals.cs_desc = fieldsValue.cs_desc;
    
    handleUpdate(formVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          name="cs_name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name', min: 5 }]}
        >
          <Input placeholder="Input" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          name="cs_desc"
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
      title="Edit Care Setting"
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
          cs_name: formVals.cs_name,
          cs_desc: formVals.cs_desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
