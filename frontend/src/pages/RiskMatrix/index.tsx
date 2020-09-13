/**
 * Risk Matrix.
 * Two pre-set risk matrix.
 * Images are stored in './assets/'.
 * TODO:
 *      User customized risk matrix is possible, but needs much more work.
 *  
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Card, Form, Select, Divider, Tooltip, Row, Col, Carousel } from 'antd';
import { connect, Dispatch } from 'umi';
import { RiskMatrixState } from './models/RiskMatrixModel';
import { RiskMatrixItemType, HazardInstanceItemType } from './data';
import risk5 from './assets/risk5.png';
import risk3 from './assets/risk3.png';
import './index.less';

const { Option } = Select;
const FormItem = Form.Item;

let hazardinstanceData: HazardInstanceItemType[];
let riskmatrixData: RiskMatrixItemType[];
let currentLikelihood: number = 5;
let currentSeverity: number = 5;
let currentRiskRating: number = 5;

interface RiskMatrixProps {
  dispatch: Dispatch<any>;
  RiskMatrixSpace: RiskMatrixState;
}

const RiskMatrix: FC<RiskMatrixProps> = ({
  dispatch,
  RiskMatrixSpace: { rmData, hiData },
}) => {

  const [form] = Form.useForm();

  const [riskImg, setRiskImg] = useState(risk5);
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const ratingOption = [
    {
      id: '3',
      name: '3',
      value: '3',
    },
    {
      id: '5',
      name: '5',
      value: '5',
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'RiskMatrixSpace/fetchHazardInstance',
      payload: {
      },
    }).then((data: HazardInstanceItemType[]) => {
      hazardinstanceData = data;
    })

    dispatch({
      type: 'RiskMatrixSpace/fetchRiskMatrix',
      payload: {
      },
    }).then((data: RiskMatrixItemType[]) => {
      // If these 3 items is not included in the database
      // -> Add these 3 items
      if (data.length < 2) {
        console.log('aaa');
        dispatch({
          type: 'RiskMatrixSpace/submitRiskMatrix',
          payload: {
            id: 'severity',
            value: '5',
          },
        });
        dispatch({
          type: 'RiskMatrixSpace/submitRiskMatrix',
          payload: {
            id: 'likelihood',
            value: '5',
          },
        });
        dispatch({
          type: 'RiskMatrixSpace/submitRiskMatrix',
          payload: {
            id: 'riskrating',
            value: '5',
          },
        });
      };

      //console.log(data);
      for (let i:number = 0; i < data.length; i++) {
        if (data[i]['id'] === "severity") {  
          currentSeverity = data[i]['value'] ?? 0;
        };
        if (data[i]['id'] === "likelihood") {
          currentLikelihood = data[i]['value'] ?? 0;
        };
        if (data[i]['id'] === "riskrating") {
          currentRiskRating = data[i]['value'] ?? 0;
        };
      };      

      form.setFieldsValue({
        li: currentLikelihood,
        rr: currentRiskRating,
        se: currentSeverity,
      });
      
      if (data[0]['value'] == 5) {        
        setRiskImg(risk5);
      } else {
        setRiskImg(risk3);
      }

      riskmatrixData = data;
    })

  }, []);

  const handleRiskChange = (value: string) => {
    if (value == "3") {
      setRiskImg(risk3);
    } else {
      setRiskImg(risk5);
    }
    currentSeverity = Number(value);
    currentLikelihood = Number(value);
    currentRiskRating = Number(value);
    // console.log(currentLikelihood);
    // console.log(currentRiskRating);
    // console.log(currentSeverity);

  }

  // When click the submit button
  const onFinish = (values: { [key: string]: any }) => {

    // Reset All Hazard Instance Values
    for (let i: number = 0; i < hazardinstanceData.length; i++) {
      let hazardinstanceItem: HazardInstanceItemType = {
        pk: hazardinstanceData[i]['pk'],
        hi_name: hazardinstanceData[i]['hi_name'],
        hi_inse: 1,
        hi_inli: 1,
        hi_rese: 1,
        hi_reli: 1,
        hi_inrr: 1,
        hi_rerr: 1,
      };

      dispatch({
        type: 'RiskMatrixSpace/updateHazardInstance',
        payload: hazardinstanceItem,
      });
    }

    // Update Risk Matrix Data
    let severityData: RiskMatrixItemType = {
      id: 'severity',
      value: currentSeverity,
    };

    let likelihoodData: RiskMatrixItemType = {
      id: 'likelihood',
      value: currentLikelihood,
    };

    let riskratingData: RiskMatrixItemType = {
      id: 'riskrating',
      value: currentRiskRating,
    };

    dispatch({
      type: 'RiskMatrixSpace/updateRiskMatrix',
      payload: severityData,
    }).then(() => {
      dispatch({
        type: 'RiskMatrixSpace/updateRiskMatrix',
        payload: likelihoodData,
      }).then(() => {
        dispatch({
          type: 'RiskMatrixSpace/updateRiskMatrix',
          payload: riskratingData,
        }).then(() => {
          // Reload Page
          window.location.reload();
        });
      });
    });
  };


  return (
    <PageHeaderWrapper>
      <Card
        title="Select Risk Matrix"        
      >    
        <div>
          <img src={riskImg} width='100%'/> 
        </div>

      </Card>

      <Card
        bordered={false}
      >
        <Form
          style={{ marginTop: 8 }}
          form={form}
          onFinish={onFinish}
        >

          <FormItem
            {...formItemLayout}
            label="Risk Level"
            name="se"
            initialValue={String(currentSeverity)}
          >
            <Select
              style={{ width: 300 }}
              placeholder="Please select"
              //defaultValue={String(currentSeverity)}
              onSelect={handleRiskChange.bind(this)}
            >
              {ratingOption.map((rt) => (
                <Option key={rt.id} value={rt.value}>
                  {rt.name}
                </Option>
              ))}
            </Select>
          </FormItem>
          
          <Divider/>
                
          <FormItem
            wrapperCol={{
              offset: 6,
            }}
          >
            <Tooltip
              placement="topLeft"
              title="All the related Hazard Instance value may be reset"
            >
              <Button
                htmlType="submit"
                type="primary"
              >
                Submit
              </Button>
            </Tooltip>

            <Button
              htmlType="button"
              style={{
                margin: '0 108px',
              }}
              onClick={() => {
                currentLikelihood = 5;
                currentRiskRating = 5;
                currentSeverity = 5;
                form.resetFields();
              }}
            >
              Reset
            </Button>
          </FormItem>

          <Row>
              <Col span={4}>
              </Col>
              <Col>
                <p> *Changing Risk Matrix will reset all the related Hazard Instance values</p>
              </Col>
          </Row>
          
        </Form>
      </Card>
    </PageHeaderWrapper>

  );
};

export default connect(
  ({    
    RiskMatrixSpace,
  }: {
    RiskMatrixSpace: RiskMatrixState;
  }) => ({
    RiskMatrixSpace,
  }),
)(RiskMatrix);
