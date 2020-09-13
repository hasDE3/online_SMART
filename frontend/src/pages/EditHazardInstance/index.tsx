/**
 *  Hazard Instance Editor.
 *  Most structures are similar to the 'Add Hazard Instance' component.
 *  It reads the 'pk' from URL.
 * 
 */

import React, { FC, useEffect, useState } from 'react';
import { Button, Card, Form, Divider, Select, Input } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { EditHazardInstanceState } from './models/EditHazardInstanceModel';
import { HazardInstanceItemType, SystemFunctionItemType, 
        RiskMatrixItemType } from './data.d';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { parse } from 'querystring';

import { CauseEffectState } from '@/models/CauseEffectModel';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';


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

let riskmatrixData: RiskMatrixItemType[];
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

interface EditHazardInstanceProps {
    dispatch: Dispatch<any>;
    EditHazardInstanceSpace: EditHazardInstanceState;
    CauseEffectSpace: CauseEffectState;
    loading: boolean;
  }

const EditHazardInstance: React.FC<EditHazardInstanceProps> = ({
    dispatch,
    EditHazardInstanceSpace: { htData, hiData, sfData, rmData },
    CauseEffectSpace: { caData, efData, cacoData, efcoData },
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

    /** Fetch the requested Hazard Instance ID */
    const getPageQuery = () => parse(window.location.href.split('?')[1]);
    let currentHazardInstanceID = getPageQuery().pk;

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
        type: 'EditHazardInstanceSpace/submitHazardInstance',
        payload: values,
      });

      history.push({
        pathname: '/hazardexplorer/list/',
        query: {        
        },
      })
      //window.location.reload();
    };

    useEffect(() => {
      dispatch({
        type: 'EditHazardInstanceSpace/fetchHazardType',
        payload: {
        },
      }).then(() => {
        dispatch({
          type: 'EditHazardInstanceSpace/fetchRiskMatrix',
          payload: {
          },
        }).then((data: RiskMatrixItemType[]) => {
          riskmatrixData = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i]['id'] == 'likelihood') {
              if (data[i]['value'] == 3) {
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

    /** Ensure that fetching Hazard Instance data before rendering the requested Hazard Instance on the page
     * Return the required data in the effects
     * and then use the following code:
     * dispatch({}).then((data) => { })
    */

    useEffect(() => {
      dispatch({
        type: 'EditHazardInstanceSpace/fetchSystemFunction',
        payload: {
        },
      }).then((data) => {
        let systemfunctionData: SystemFunctionItemType[] = data;
        dispatch({
          type: 'EditHazardInstanceSpace/fetchHazardInstance',
          payload: {
          },
        }).then((data: HazardInstanceItemType[]) => {
          let matchIndex = -1;
          if (currentHazardInstanceID) {
            // console.log(currentHazardInstanceID);
            if (data) {
              // console.log(data);
              for(let i = 0, len = data.length; i < len; i++){
                if (currentHazardInstanceID === data[i].pk) {
                  // console.log(data[i]);
                  matchIndex = i;
                }
              }
            }
            if (matchIndex > -1) {
              let associatedSF: string = data[matchIndex].hi_sf;

              if (systemfunctionData) {
                let unused: boolean = true;
                console.log(data[matchIndex].hi_sf);
                for (let j: number = 0; j < systemfunctionData.length; j++) {
                  console.log(systemfunctionData[j].pk);
                  if (data[matchIndex].hi_sf === systemfunctionData[j].pk) {
                    unused = false;
                  }
                }
                if (unused) {
                  associatedSF = "";
                }
              }

              likelihood1 = data[matchIndex].hi_inli;
              likelihood2 = data[matchIndex].hi_reli;
              severity1 = data[matchIndex].hi_inse;
              severity2 = data[matchIndex].hi_rese;
              riskrating1 = data[matchIndex].hi_inrr;
              riskrating2 = data[matchIndex].hi_rerr;

              form.setFieldsValue({
                pk: data[matchIndex].pk,
                hi_name: data[matchIndex].hi_name,
                hi_desc: data[matchIndex].hi_desc,
                hi_inse: data[matchIndex].hi_inse,
                hi_inli: data[matchIndex].hi_inli,
                hi_rese: data[matchIndex].hi_rese,
                hi_reli: data[matchIndex].hi_reli,
                hi_inrr: data[matchIndex].hi_inrr,
                hi_rerr: data[matchIndex].hi_rerr,
                hi_clju: data[matchIndex].hi_clju,
                hi_parent: data[matchIndex].hi_parent,
                hi_sf: associatedSF,
              });
            }
          };
        })
      })
    }, []);

    const readFromHazardLog = () => {
      let matchIndex = -1;
      if (currentHazardInstanceID) {
        console.log(currentHazardInstanceID);
        if (hiData) {
          console.log(hiData);
          for(var i = 0, len = hiData.length; i < len; i++){
            if (currentHazardInstanceID == hiData[i].pk) {
              console.log(hiData[i]);
              matchIndex = i;
            }
          }
        }
        if (matchIndex > -1) {
          form.setFieldsValue({
            pk: hiData[matchIndex].pk,
            hi_name: hiData[matchIndex].hi_name,
            hi_desc: hiData[matchIndex].hi_desc,
            hi_inse: hiData[matchIndex].hi_inse,
            hi_inli: hiData[matchIndex].hi_inli,
            hi_rese: hiData[matchIndex].hi_rese,
            hi_reli: hiData[matchIndex].hi_reli,
            hi_inrr: hiData[matchIndex].hi_inrr,
            hi_rerr: hiData[matchIndex].hi_rerr,
            hi_clju: hiData[matchIndex].hi_clju,
            hi_parent: hiData[matchIndex].hi_parent,
            hi_sf: hiData[matchIndex].hi_sf,
        });
      }
    };
    }

    const handleMenuChange = (value: string) => {
      //const requestID: string = value.replace(/-/g,"");

      let matchIndex = -1;
      let currentHazardInstance: HazardInstanceItemType = {
        pk: '',
        hi_name: '',
        hi_desc: '',
        hi_inse: 0,
        hi_inli: 0,
        hi_rese: 0,
        hi_reli: 0,
        hi_inrr: 0,
        hi_rerr: 0,
        hi_clju: '',
        hi_parent: '',
        hi_sf: '',
      };

      if (hiData) {
        for(var i = 0, len = hiData.length; i < len; i++){
          if (value == hiData[i].pk) {
            console.log(hiData[i]);
            matchIndex = i;
          }
        }
      }

      if (matchIndex == -1) {
        form.setFieldsValue({
          pk: currentHazardInstance.pk,
          hi_name: currentHazardInstance.hi_name,
          hi_desc: currentHazardInstance.hi_desc,
          hi_inse: currentHazardInstance.hi_inse,
          hi_inli: currentHazardInstance.hi_inli,
          hi_rese: currentHazardInstance.hi_rese,
          hi_reli: currentHazardInstance.hi_reli,
          hi_inrr: currentHazardInstance.hi_inrr,
          hi_rerr: currentHazardInstance.hi_rerr,
          hi_clju: currentHazardInstance.hi_clju,
          hi_parent: currentHazardInstance.hi_parent,
          hi_sf: currentHazardInstance.hi_sf,
        });
      } else {
        form.setFieldsValue({
          pk: hiData[matchIndex].pk,
          hi_name: hiData[matchIndex].hi_name,
          hi_desc: hiData[matchIndex].hi_desc,
          hi_inse: hiData[matchIndex].hi_inse,
          hi_inli: hiData[matchIndex].hi_inli,
          hi_rese: hiData[matchIndex].hi_rese,
          hi_reli: hiData[matchIndex].hi_reli,
          hi_inrr: hiData[matchIndex].hi_inrr,
          hi_rerr: hiData[matchIndex].hi_rerr,
          hi_clju: hiData[matchIndex].hi_clju,
          hi_parent: hiData[matchIndex].hi_parent,
          hi_sf: hiData[matchIndex].hi_sf,
        });
      }
    }




    const ratings3 = [
      {
        id: '0',
        name: '0',
        value: '0',
      },
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


  return (

    <PageHeaderWrapper>
      <Card bordered={false}>
        <Form
        style={{ marginTop: 8 }}
        form={form}
        name="basic"
        onFinish={onFinish}
        >
          <FormItem
          {...formItemLayout}
          label="Select"
          name="pk"
          rules={[
            {
              required: true,
            },
          ]}
          >
            <Select
              //defaultValue={currentHazardInstanceID}
              style={{ width: 300 }}
              placeholder="Please select"
              onChange={handleMenuChange.bind(this)}

              //onSelect={handleMenuChange2.bind(this)}
            >
              {
                hiData?.map( (hi) => (
                  <Select.Option key={hi.pk} value={hi.pk}>{hi.hi_name}</Select.Option>)
                )
              }
            </Select>
          </FormItem>
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
              Update
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
    EditHazardInstanceSpace,
    CauseEffectSpace,
    loading,
  }: {
    EditHazardInstanceSpace: EditHazardInstanceState;
    CauseEffectSpace: CauseEffectState;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    EditHazardInstanceSpace,
    CauseEffectSpace,
    loading: loading.models.EditHazardInstanceSpace,
  }),

)(EditHazardInstance);
