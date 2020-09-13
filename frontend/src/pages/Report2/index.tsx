/**
 * Report
 */

import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Table, Row,  Input, Form, Col, Divider, Descriptions } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import { ReportItemType } from './data.d';
import { ReportState } from './models/ReportModel';
import CreateReport from './components/CreateReport';
import UpdateReport from './components/UpdateReport';
import DescriptionsItem from 'antd/lib/descriptions/Item';

const FormItem = Form.Item;
let currentUpdateID: string = "";

interface Report2Props {
  ReportSpace: ReportState;
  dispatch: Dispatch<any>;
}

const Report2: FC<Report2Props> = ({
  dispatch,
  ReportSpace: { reData },
}) => {

  useEffect(() => {
    dispatch({
      type: 'ReportSpace/fetchReport',
      payload: {
      },
    });
  }, []);

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const handleRemove = (pk: string) => {
    dispatch({
      type: 'ReportSpace/removeReport',
      payload: { pk },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 're_name',
    },
    {
      title: 'Description',
      dataIndex: 're_desc',
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: React.ReactNode, record: ReportItemType) => (
        <>
            <a
              onClick={() => {
                //jumpToEdit(record.pk);
                handleUpdateModalVisible(true);
                console.log(record);
                setStepFormValues(record);
                currentUpdateID = record.id;
              }}
            >
              Edit
            </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove(record.id.replace(/-/g,""));
              window.location.reload();
            }}
          >
          Remove
          </a>
        </>
      ),
    },
  ];

  /** Add new report
   * 
   * @param fields 
   */
  const handleAdd = (fields: ReportItemType) => {
    //console.log(fields);
    dispatch({
        type: 'ReportSpace/addReport',
        payload: { 
          re_name: fields.re_name,
          re_desc: fields.re_desc, 
        },
    });
  };

  const handleUpdate = (fields: ReportItemType) => {
    //console.log(fields);
    dispatch({
        type: 'ReportSpace/updateReport',
        payload: { 
          id: currentUpdateID,
          re_name: fields.re_name,
          re_desc: fields.re_desc,
          re_crm: fields.re_crm,
          re_cm: fields.re_cm,
          re_ss: fields.re_ss,
          re_qa: fields.re_qa,
        },
    });
  };

  return (
    <PageHeaderWrapper>
      <Card
        title="Report Selection"
      >
        <Row gutter={[16, 24]} justify="end">
          <Col> 
              <Button
                type="primary"
                icon={<FormOutlined />}
                onClick={() => handleModalVisible(true)}
              >New Report
              </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              rowKey="id"
              dataSource={ reData }
              expandable={{
                expandedRowRender: record => (
                  <Descriptions column={1} layout="vertical" bordered title="Report Detail">
                    <DescriptionsItem label="Clinical Risk Management: ">{record.re_crm} <br /></DescriptionsItem>
                    <DescriptionsItem label="Quality Assurance and Document Approval: ">{record.re_qa} <br /></DescriptionsItem>
                    <DescriptionsItem label="Safety Statement: ">{record.re_ss} <br /></DescriptionsItem>
                    <DescriptionsItem label="Configuration Management: ">{record.re_cm} <br /></DescriptionsItem>
                </Descriptions>
                )
              }}
            />
          </Col>
        </Row>
      </Card>

      <CreateReport
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          handleModalVisible(false);
          window.location.reload();          
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />

      <UpdateReport
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          handleModalVisible(false);
          setStepFormValues({});
          window.location.reload();  
          //const success = await handleUpdate(value);
          //if (success) {
            //handleModalVisible(false);
            //setStepFormValues({});

          //}
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        values={stepFormValues}
      />
    </PageHeaderWrapper>
  );
};


export default connect(
  ({
    ReportSpace,
  }: {
    ReportSpace: ReportState;
  }) => ({
    ReportSpace,
  }),
)(Report2);