/** 
 * 'HazardInstanceAssociation.tsx' defines the associated hazard instance for process node.
 * 
 * */

import { Button, Form, Table, Select, Space } from 'antd';
import React, { Component } from 'react';
import { connect, Dispatch, history } from 'umi';
import { CareProcessState } from '@/pages/CareProcessEditor/models/CareProcessModel';
import { HazardInstanceItemType, ProcessNode_HazardInstanceItemType } from './data';

const FormItem = Form.Item;

let hazardinstanceData: HazardInstanceItemType[];
let pn_hiData: ProcessNode_HazardInstanceItemType[];

let listData: {} = {
  related: [],
  unrelated: [],
};

let requestSystemID: string = "all";

interface HazardInstanceAssociationProps {
  dispatch: Dispatch<any>;
  CareProcessSpace: CareProcessState;
  loading: boolean;
}

class HazardInstanceAssociation extends Component<HazardInstanceAssociationProps> {

  formRef = React.createRef();

  constructor(props:any) {
    super(props);
    this.state = {
      currentStepID: this.props.stepID,
      dis: true,
    }
  }

  componentWillReceiveProps (nextProps: any) {
    const { dispatch } = this.props;
    const { dis } = this.state;
    this.setState({
      currentStepID: nextProps.stepID
    });

    if (dis) {
      dispatch({
        type: 'CareProcessSpace/fetchProcessNode_HazardInstance',
        payload: {
        },
      }).then((data) => {
        pn_hiData = data;
        this.setState({
          dis: false,
        })        
        this.handleNewState(nextProps.stepID);
      })
    } else {
      this.handleNewState(nextProps.stepID);
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'CareProcessSpace/fetchHazardInstance',
      payload: {
      },
    }).then((data) => {
      hazardinstanceData = data;
      dispatch({
        type: 'CareProcessSpace/fetchProcessNode_HazardInstance',
        payload: {
        },
      }).then((data) => {
        pn_hiData = data;
      })
    });
  };

  handleNewState = (id: string) => {
    const { CareProcessSpace } = this.props;
    const { hiData, pnhiData } = CareProcessSpace;
    listData = {
      related: [],
      unrelated: [],
    }
    let currentStepID=id;
    if (pnhiData) {
      // Search 'pnsfData' for item contains 'currentStepID'
      for (let i: number = 0; i < pnhiData.length; i++) {
        // If find a related item
        if ( pnhiData[i].pn === currentStepID) {
          if (hiData) {
            // Search 'hiData' for the related 'System Function'
            for (let j: number = 0; j < hiData.length; j++) {
              // Got the related 'System Function'
              if (pnhiData[i].hi === hiData[j].pk.replace(/-/g,"")) {
                // Add it to the database                
                listData['related'].push(hiData[j]);
              }
            }
          }
        }
      }
    }

    if (hiData) {
      for (let i: number = 0; i < hiData.length; i++) {
        let addable = true;
        for (let j: number = 0; j < listData['related'].length; j++) {
          if (listData['related'][j].pk === hiData[i].pk) {
            addable = false;
          }
        }
        if (addable) {
          listData['unrelated'].push(hiData[i]);
        }
      }
    }    
  }

  handleRemove = (pn_id: string, hi_pk: string) => {
    const { dispatch } = this.props;
    let pnhi_id: string = "";
    for (let i: number = 0; i < pn_hiData.length; i++) {
      if (pn_hiData[i].hi === hi_pk.replace(/-/g, "")
        && pn_hiData[i].pn === pn_id) {
        pnhi_id = pn_hiData[i].id;
      }
    }

    // Delete some unused hazard instance associations
    for (let p: number = 0; p < pn_hiData.length; p++) {
      let unused: boolean = true;
      for (let pp: number = 0; pp < hazardinstanceData.length; pp++) {
        if (hazardinstanceData[pp].pk.replace(/-/g,"") === pn_hiData[p].hi) {
          unused = false;
        }
      }
      if (unused) {
        dispatch({
          type: 'CareProcessSpace/removeProcessNode_HazardInstance',
          payload: {
            id: pn_hiData[p].id,
          },
        });
      }
    }

    if (pnhi_id !== "") {
      dispatch({
        type: 'CareProcessSpace/removeProcessNode_HazardInstance',
        payload: {
          id: pnhi_id,
        },
      });
      this.setState({
        dis: true,
      });
    }
  }

  handleAdd = (pn_id: string, hi_pk: string) => {
    const { dispatch } = this.props;
    if (pn_id && hi_pk !== "all") {
      const tempProcessNode_HazardInstance: ProcessNode_HazardInstanceItemType = {
        pn: pn_id,
        hi: hi_pk,
      }
      dispatch({
        type: 'CareProcessSpace/submitProcessNode_HazardInstance',
        payload: {
          ...tempProcessNode_HazardInstance
        },
      });
      this.setState({
        dis: true,
      });
    }
    this.formRef.current.resetFields();
  }

  handleMenuChange = (value: string) => {
    /** 
     * Replace '-' to match the UUID type in backend database 
     * For example:
     *      3416f6c9-298d-485c-bfe2-f41068c59116 =>
     *      3416f6c9298d485cbfe2f41068c59116
     *      
    */
    requestSystemID = value.replace(/-/g,"");
  }

  render() {
    const { currentStepID } = this.state;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'hi_name',
      },
      {
        title: 'Description',
        dataIndex: 'hi_desc',
      },
      {
        title: 'Action',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            <a
              onClick={() => { this.handleRemove(currentStepID, record.pk) }}
            >
              Remove
            </a>
          </>
        ),
      },
    ];

    return (
      <div>
        <Form
          layout="vertical"
          ref={this.formRef}
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 22 }}

        >
          <FormItem
            name="pn_hi"
          >
            <Space
              size={80}
            >
              <Select
                defaultValue="all"
                style={{ width: 260 }}
                placeholder="Please select"
                onChange={this.handleMenuChange.bind(this)}
              >
                <Select.Option value="all" key="allmenu">Select a Hazard Instance</Select.Option>
                {
                  listData['unrelated'].map( (hi) => (
                    <Select.Option key={hi.pk} value={hi.pk}>{hi.hi_name}</Select.Option>)
                  )
                }
              </Select>
              <Button
                onClick={() => {
                  this.handleAdd(currentStepID, requestSystemID);
                }}
                type="primary"
              >
                Add to List
              </Button>

              <Button
                onClick={() => {
                  history.push({
                    pathname: '/hazardexplorer/new/',
                    query: {
                    },
                  })
                }}
                type="primary"
              >
                Create Hazard Instance
              </Button>
            </Space>
          </FormItem>

          <FormItem>
            <Table
              dataSource={listData['related']}
              columns={columns}
              rowKey="pk"
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(
  ({
     CareProcessSpace,
     loading,
   }: {
    CareProcessSpace: CareProcessState;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    CareProcessSpace,
    loading: loading.models.CareProcessSpace,
  }),
)(HazardInstanceAssociation);
