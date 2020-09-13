import React from 'react';
import { Form, Input, Modal } from 'antd';
import { ReportItemType } from '../data.d';

const FormItem = Form.Item;
const { TextArea } = Input;

interface UpdateReportProps {
  onCancel: (flag?: boolean, formVals?: ReportItemType) => void;
  //onSubmit: (fieldsValue: { 
//                            cs_index: string,
                            //cs_name: string,
                            //cs_desc: string,}) => void;
  onSubmit: (values: ReportItemType) => void;
  updateModalVisible: boolean;
  values: Partial<ReportItemType>;
}

const UpdateReport: React.FC<UpdateReportProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();

    let updateData: ReportItemType = {
      id: fieldsValue.id,
      re_name: fieldsValue.re_name,
      re_desc: fieldsValue.re_desc,
      re_crm: fieldsValue.re_crm,
      re_cm: fieldsValue.re_cm,
      re_ss: fieldsValue.re_ss,
      re_qa: fieldsValue.re_qa,
    };
    //setFormVals({...fieldsValue});
    //setFormVals({ ...formVals, ...fieldsValue });
    //formVals.cs_name = fieldsValue.cs_name;
    //formVals.cs_desc = fieldsValue.cs_desc;
    
    handleUpdate(updateData);
  };

  return (
    <Modal
      destroyOnClose
      title="Update Report"
      visible={updateModalVisible}
      onOk={() => handleSubmit()}
      onCancel={() => handleUpdateModalVisible(false, values)}
    >
      <Form 
        form={form}
        layout="vertical"
        initialValues={{
          pk: values.id,
          re_name: values.re_name,
          re_desc: values.re_desc,
          re_crm: values.re_crm,
          re_cm: values.re_cm,
          re_ss: values.re_ss,
          re_qa: values.re_qa,

        }}
      >
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
          label="Description"
          name="re_desc"        
        >
          <TextArea placeholder="Description" rows={2}/>
        </FormItem>

        <FormItem
          name="re_crm"
          label="Clinical Risk Management"
        >
          <TextArea placeholder="Clinical Risk Management" rows={3}/>
        </FormItem>

        <FormItem
          name="re_ss"
          label="Safety Statement"              
        >
          <TextArea placeholder="Safety Statement" rows={3}/>
        </FormItem>

        <FormItem
          name="re_qa"
          label="Quality Assurance and Document Approval"
        >
          <TextArea placeholder="Quality Assurance and Document Approval" rows={3}/>
        </FormItem>

        <FormItem
          name="re_cm"
          label="Configuration Management"              
        >
          <TextArea placeholder="Configuration Management" rows={3}/>
        </FormItem>

      </Form>
    </Modal>
  );
};

export default UpdateReport;