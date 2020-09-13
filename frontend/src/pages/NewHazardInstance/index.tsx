/**
 * Add new hazard instance.
 * Can work separately.
 */

import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Form, Divider, Select, Input, Row, Table } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { AddHazardInstanceState } from './models/AddHazardInstanceModel';
import { HazardInstanceItemType, HazardTypeItemType, SystemFunctionItemType, SystemItemType, RiskMatrixItemType } from './data.d';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

let severity1: number = 0;
let severity2: number = 0;
let likelihood1: number = 0;
let likelihood2: number = 0;
let riskrating1: number = 0;
let riskrating2: number = 0;

let risk_matrix: number = 5;

let riskratingRatings1 = [
  {
    id: '1',
    name: '1',
    value: '1',
  },
  {
    id: '2',
    name: '2',
    value: '2',
  },
  {
    id: '3',
    name: '3',
    value: '3',
  },
  {
    id: '4',
    name: '4',
    value: '4',
  },
  {
    id: '5',
    name: '5',
    value: '5',
  },
];

let severityRatings1 = [
  {
    id: '1',
    name: 'Minor (1)',
    value: '1',
  },
  {
    id: '2',
    name: 'Significant (2)',
    value: '2',
  },
  {
    id: '3',
    name: 'Considerable (3)',
    value: '3',
  },
  {
    id: '4',
    name: 'Major (4)',
    value: '4',
  },
  {
    id: '5',
    name: 'Catastrophic (5)',
    value: '5',
  },
];


let likelihoodRatings1 = [
  {
    id: '1',
    name: 'Very Low (1)',
    value: '1',
  },
  {
    id: '2',
    name: 'Low (2)',
    value: '2',
  },
  {
    id: '3',
    name: 'Medium (3)',
    value: '3',
  },
  {
    id: '4',
    name: 'High (4)',
    value: '4',
  },
  {
    id: '5',
    name: 'Very High (5)',
    value: '5',
  },
];
interface AddHazardInstanceProps {
    dispatch: Dispatch<any>;
    AddHazardInstanceSpace: AddHazardInstanceState;
    loading: boolean;
    
}

const AddHazardInstance: React.FC<AddHazardInstanceProps> = ({
    dispatch,
    AddHazardInstanceSpace: { htData, hiData, sfData, rmData },
    loading,
    
  }) => {

    let calculateRiskRating5: (l: number, s: number) => number = function (l: number, s: number): number {
      const a = l + s;
      if (a > 8) {
        return 5;
      }

      if ((a === 7) && ((l === 5) || (s === 5))) {
        return 4;
      }

      if (a === 8) {
        return 4;
      }

      if (a > 5) {
        return 3;
      }

      if (a > 3) {
        return 2;
      }

      return 1;
    };

    let calculateRiskRating3: (l: number, s: number) => number = function (l: number, s: number): number {
      const a = l + s;
      if (a > 4) {
        return 3;
      }

      if (a > 3) {
        return 2;
      }

      return 1;
    };
  
    const [riskratingRatings, setRiskRatings] = useState(riskratingRatings1);
    const [severityRatings, setSeverityRatings] = useState(severityRatings1);
    const [likelihoodRatings, setLikelihoodRatings] = useState(likelihoodRatings1);

    const [form] = Form.useForm();
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

    const onFinish = (values: { [key: string]: any }) => {
      dispatch({
        type: 'AddHazardInstanceSpace/submitHazardInstance',
        payload: values,
      });

      history.push({
        pathname: '/hazardexplorer/list/',
        query: {        
        },
      })
      //window.location.reload();
    };


    const handleInitialSeverityChange = (value: string) => {
      severity1 = +value;
      if (likelihood1 != 0) {
        if (risk_matrix === 5) {
          riskrating1 = calculateRiskRating5(severity1, likelihood1);
        } else {
          riskrating1 = calculateRiskRating3(severity1, likelihood1);
        }
        form.setFieldsValue({
          hi_inrr: riskrating1,
        });
      }
      console.log(riskrating1);

    }

    const handleResidualSeverityChange = (value: string) => {
      severity2 = +value;
      if (likelihood2 != 0) {
        if (risk_matrix === 5) {
          riskrating2 = calculateRiskRating5(severity2, likelihood2);
        } else {
          riskrating2 = calculateRiskRating3(severity2, likelihood2);
        }
        form.setFieldsValue({
          hi_rerr: riskrating2,
        });
      }
      console.log(riskrating2);
    }

    const handleInitialLikelihoodChange = (value: string) => {
      likelihood1 = +value;
      if (severity1 != 0) {
        if (risk_matrix === 5) {
          riskrating1 = calculateRiskRating5(severity1, likelihood1);
        } else {
          riskrating1 = calculateRiskRating3(severity1, likelihood1);
        }
        form.setFieldsValue({
          hi_inrr: riskrating1,
        });
      }
      console.log(riskrating1);
    }

    const handleResidualLikelihoodChange = (value: string) => {
      likelihood2 = +value;
      if (severity2 != 0) {
        if (risk_matrix === 5) {
          riskrating2 = calculateRiskRating5(severity2, likelihood2);
        } else {
          riskrating2 = calculateRiskRating3(severity2, likelihood2);
        }
        form.setFieldsValue({
          hi_rerr: riskrating2,
        });
      }
      console.log(riskrating2);
    }

    /**
    const getHazardTypeOption = () => {
      if (htData) {
        console.log('hellol');
        console.log(htData);
        return (
          htData.map( (ht) => (
            <Option key={ht.pk} value={ht.pk}>
              {ht.ht_name}
            </Option>
          ))
        )
      }
      console.log('eee');
      return [];
    };
    */
    
    useEffect(() => {
      dispatch({
        type: 'AddHazardInstanceSpace/fetchHazardType',
        payload: {
        },
      }).then(() => {
        dispatch({
          type: 'AddHazardInstanceSpace/fetchRiskMatrix',
          payload: {
          },
        }).then((data: RiskMatrixItemType[]) => {
          // 
          for (let i = 0; i < data.length; i++) {
            if (data[i]['id'] == 'likelihood') {
              if (data[i]['value'] == 3) {
                risk_matrix = 3;
                likelihoodRatings1 = [
                  {
                    id: '1',
                    name: 'Low (1)',
                    value: '1',
                  },
                  {
                    id: '2',
                    name: 'Medium (2)',
                    value: '2',
                  },
                  {
                    id: '3',
                    name: 'High (3)',
                    value: '3',
                  },
                ];
              }              
            }

            if (data[i]['id'] == 'severity') {
              if (data[i]['value'] == 3) {
                severityRatings1 = [
                  {
                    id: '1',
                    name: 'Minor (1)',
                    value: '1',
                  },
                  {
                    id: '2',
                    name: 'Considerable (2)',
                    value: '2',
                  },
                  {
                    id: '3',
                    name: 'Catastrophic (3)',
                    value: '3',
                  },
                ];
              }              
            }

            if (data[i]['id'] == 'riskrating') {
              if (data[i]['value'] == 3) {
                riskratingRatings1 = [
                  {
                    id: '1',
                    name: '1',
                    value: '1',
                  },
                  {
                    id: '2',
                    name: '2',
                    value: '2',
                  },
                  {
                    id: '3',
                    name: '3',
                    value: '3',
                  },
                ];
              }              
            }

            setLikelihoodRatings(likelihoodRatings1);
            setRiskRatings(riskratingRatings1);
            setSeverityRatings(severityRatings1);
          }       
        })
      })
    }, []);

    useEffect(() => {
      dispatch({
        type: 'AddHazardInstanceSpace/fetchHazardInstance',
        payload: {
        },
      });
    }, []);

    useEffect(() => {
      dispatch({
        type: 'AddHazardInstanceSpace/fetchHazardInstance',
        payload: {
        },
      });
    }, []);

    useEffect(() => {
      dispatch({
        type: 'AddHazardInstanceSpace/fetchSystemFunction',
        payload: {
        },
      });
    }, []);

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Form
        style={{ marginTop: 8 }}
        form={form}
        name="basic"
        onFinish={onFinish}
        >
          <Divider>Basic Information</Divider>
          <FormItem
            {...formItemLayout}
            label="Name"
            name="hi_name"
            rules={[
              {
                required: true,
                message: "Please Input Hazard Instance Name",
              },
            ]}
          >
            <Input placeholder="Hazard Instance Name" />
          </FormItem>

          <FormItem            
            {...formItemLayout}
            label="Description"
            name="hi_desc"
            rules={[
              {
                required: false,
                message: "Please Input Description",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Description" />
          </FormItem>

          <Divider>Instance Associations</Divider>
            <FormItem
              {...formItemLayout}
              label="Hazard Type"
              name="hi_parent"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                {
                  htData?.map( (ht) => (
                    <Option key={ht.pk} value={ht.pk}>
                      {ht.ht_name}
                    </Option>
                  ))
                }
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="System Function"
              name="hi_sf"
            >
              <Select>
              {
                sfData?.map( (sf) => (
                  <Option key={sf.pk} value={sf.pk}>
                    {sf.sf_name}
                  </Option>
                ))
              }
              </Select>
            </FormItem>

          <Divider>Risk Assessment</Divider>

          <FormItem            
            {...formItemLayout}
            label="Initial Severity"
            name="hi_inse"
          >
            <Select placeholder="Select" onChange={handleInitialSeverityChange.bind(this)}>
              {severityRatings.map((rt) => (
                <Option key={rt.id} value={rt.value}>
                  {rt.name}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem            
            {...formItemLayout}
            label="Initial Likelihood"
            name="hi_inli"
          >
            <Select placeholder="Select" onChange={handleInitialLikelihoodChange.bind(this)}>
            {likelihoodRatings.map((rt) => (
              <Option key={rt.id} value={rt.value}>
                {rt.name}
              </Option>
            ))}
            </Select>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Initial Risk Rating"
            name="hi_inrr"           
          >
            <Select placeholder="" disabled>
            {riskratingRatings.map((rt) => (
              <Option key={rt.id} value={rt.value}>
                {rt.name}
              </Option>
            ))}
            </Select>
          </FormItem>

          <Divider/>

          <FormItem            
          {...formItemLayout}
          label="Residual Severity"
          name="hi_rese"
          >
            <Select placeholder="Select" onChange={handleResidualSeverityChange.bind(this)}>
            {severityRatings.map((rt) => (
              <Option key={rt.id} value={rt.value}>
                {rt.name}
              </Option>
            ))}
            </Select>
          </FormItem>

          <FormItem            
          {...formItemLayout}
          label="Residual Likelihood"
          name="hi_reli"
          >
            <Select placeholder="Select" onChange={handleResidualLikelihoodChange.bind(this)}>
            {likelihoodRatings.map((rt) => (
              <Option key={rt.id} value={rt.value}>
                {rt.name}
              </Option>
            ))}
            </Select>
          </FormItem>

          <FormItem            
          {...formItemLayout}
          label="Residual Risk Rating"
          name="hi_rerr"          
          >
            <Select placeholder="" disabled>
            {riskratingRatings.map((rt) => (
              <Option key={rt.id} value={rt.value}>
                {rt.name}
              </Option>
            ))}
            </Select>
          </FormItem>

          <Divider>Other Information</Divider>

          <FormItem            
            {...formItemLayout}
            label="Clinical Justification"
            name="hi_clju"
            initialValue=""
            rules={[
              {
                required: false,
                message: "Please Input Clinical Justification",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Clinical Justification" />
          </FormItem>

          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Button 
              htmlType="submit" 
              type="primary"
            >
              Submit
            </Button>
            
            <Button 
              htmlType="button"
              style={{
                margin: '0 108px',
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
          </Form.Item>

        </Form>

      </Card>
    </PageHeaderWrapper>

  );
};

export default connect (
  ({
    AddHazardInstanceSpace,
    loading,
  }: {
    AddHazardInstanceSpace: AddHazardInstanceState;
    loading: { models: { [key: string]: boolean } };
  }) => ({ 
    AddHazardInstanceSpace,
    loading: loading.models.AddHazardInstanceSpace,
  }),

)(AddHazardInstance);
