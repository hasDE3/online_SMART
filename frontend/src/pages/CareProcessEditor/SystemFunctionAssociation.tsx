/** 
 * 'SystemFunctionAssociation.tsx' defines the associated system function for process node.
 * 
 * */
import { Button, Form, Table, Select, Space } from 'antd';
import React, { FC, useEffect, useState, useRef, Component } from 'react';
import { connect, Dispatch, history } from 'umi';
import { CareProcessState } from '@/pages/CareProcessEditor/models/CareProcessModel';
import { SystemFunctionItemType, ProcessNode_SystemFunctionItemType, SystemItemType } from './data';
import CreateForm from './components/AddSystemFunction';
import { addSystemFunction } from './service';

// import from other folders
import MenuSpace from '../SystemFunction/models/SystemModel';
import { MenuState } from 'antd/lib/menu';

const FormItem = Form.Item;

let systemfunctionData: SystemFunctionItemType[];
let pn_sfData: ProcessNode_SystemFunctionItemType[];
let systemData: SystemItemType[] = [];

let listData: {} = {
  related: [],
  unrelated: [],
};

let requestSystemID: string = "all";


/**
 *  Add New System Function
*/
const handleSystemFunctionAdd = async (fields: SystemFunctionItemType) => {  
  try {
    await addSystemFunction({
      sf_name: fields.sf_name,
      sf_desc: fields.sf_desc,
      sf_parent: fields.sf_parent.replace(/-/g,""),
    });    
    return true;
  } catch (error) {    
    return false;
  }
};
interface SystemFunctionAssociationProps {
  dispatch: Dispatch<any>;
  CareProcessSpace: CareProcessState;
  MenuSpace: MenuState;
  loading: boolean;  
}

class SystemFunctionAssociation extends Component<SystemFunctionAssociationProps> {

  formRef = React.createRef();

  constructor(props:any) {
    super(props);
    this.state = {
      currentStepID: this.props.stepID,
      dis: true,
      createModalVisible: false,
      updateModalVisible: false,
      
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
        type: 'CareProcessSpace/fetchProcessNode_SystemFunction',
        payload: {
        },
      }).then((data) => {
        pn_sfData = data;
        this.setState({
          dis: false,
        })
        // console.log('dis');
        this.handleNewState(nextProps.stepID);
      })
    } else {
      this.handleNewState(nextProps.stepID);
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'MenuSpace/fetchMenu',
      payload: {
      },
    }).then((data) => {
      systemData = data;
    });

    // console.log('sffffff');
    dispatch({
      type: 'CareProcessSpace/fetchSystemFunction',
      payload: {
      },
    }).then((data) => {
      systemfunctionData = data;
      // console.log(systemfunctionData);
      dispatch({
        type: 'CareProcessSpace/fetchProcessNode_SystemFunction',
        payload: {
        },
      }).then((data) => {
        pn_sfData = data;

      })
    });
  };

  handleNewState = (id: string) => {
    const { CareProcessSpace } = this.props;
    const { sfData, pnsfData } = CareProcessSpace;
    listData = {
      related: [],
      unrelated: [],
    }
    let currentStepID=id;
    if (pnsfData) {
      // Search 'pnsfData' for item contains 'currentStepID'
      for (let i: number = 0; i < pnsfData.length; i++) {
        // If find a related item
        if ( pnsfData[i].pn == currentStepID) {
          // console.log(pnsfData[i].sf);
          if (sfData) {
            // Search 'sfData' for the related 'System Function'
            for (let j: number = 0; j < sfData.length; j++) {
              // Got the related 'System Function'
              if (pnsfData[i].sf === sfData[j].pk.replace(/-/g,"")) {
                // Add it to the database
                // console.log('Add');
                listData['related'].push(sfData[j]);
              }
            }
          }
        }
      }
    }

    if (sfData) {
      for (let i: number = 0; i < sfData.length; i++) {
        let addable = true;
        for (let j: number = 0; j < listData['related'].length; j++) {
          if (listData['related'][j].pk === sfData[i].pk) {
            addable = false;
          }
        }
        if (addable) {
          listData['unrelated'].push(sfData[i]);
        }
      }
    }

    // console.log(listData);

  }


  handleRemove = (pn_id: string, sf_pk: string) => {
    const { dispatch } = this.props;
    let pnsf_id: string = "";
    for (let i: number = 0; i < pn_sfData.length; i++) {
      if (pn_sfData[i].sf === sf_pk.replace(/-/g,"")
        && pn_sfData[i].pn === pn_id) {
        pnsf_id = pn_sfData[i].id ?? "";
      }
    }

    // Delete some unused system function associations
    for (let p: number = 0; p < pn_sfData.length; p++) {
      let unused: boolean = true;
      for (let pp: number = 0; pp < systemfunctionData.length; pp++) {
        if (systemfunctionData[pp].pk.replace(/-/g,"") === pn_sfData[p].sf) {
          unused = false;
        }
      }
      if (unused) {
        dispatch({
          type: 'CareProcessSpace/removeProcessNode_SystemFunction',
          payload: {
            id: pn_sfData[p].id,
          },
        });
      }
    }

    if (pnsf_id !== "") {
      dispatch({
        type: 'CareProcessSpace/removeProcessNode_SystemFunction',
        payload: {
          id: pnsf_id,
        },
      });
      this.setState({
        dis: true,

      });
    } else {
    }

  }

  handleAdd = (pn_id: string, sf_pk: string) => {
    const { dispatch } = this.props;

    if (pn_id && sf_pk !== "all") {
      const tempProcessNode_SystemFunction: ProcessNode_SystemFunctionItemType = {
        pn: pn_id,
        sf: sf_pk,
      }

      dispatch({
        type: 'CareProcessSpace/submitProcessNode_SystemFunction',
        payload: {
          ...tempProcessNode_SystemFunction
        },
      });

      this.setState({
        dis: true,

      });

    }

    this.formRef.current.resetFields();
    /**
    for (let i: number = 0; i < listData['unrelated'].length; i++) {
      if (listData['unrelated'][i].pk.replace(/-/g,"") == sf_pk) {
        listData['related'].push(listData['unrelated'][i]);
        listData['unrelated'].splice(i, 1);
      }
    }
    */
    //console.log(listData);
    // this.handleNewState(this.state.currentStepID);


  }

  handleMenuChange = (value: string) => {
    /** Replace '-' to match the UUID type in backend database */
    requestSystemID = value.replace(/-/g,"");
  }

  render() {
    const { currentStepID } = this.state;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'sf_name',
      },
      {
        title: 'Description',
        dataIndex: 'sf_desc',
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
            name="pn_sf"
          >
            <Space
              size={80}
            >
              <Select
                defaultValue="all"
                style={{ width: 260 }}
                placeholder="Please select"
                onChange={this.handleMenuChange.bind(this)}
                //onSelect={this.handleMenuChange.bind(this)}
              >
                <Select.Option value="all" key="allmenu">Select a System Function</Select.Option>
                {
                  listData['unrelated'].map( (sf) => (
                    <Select.Option key={sf.pk} value={sf.pk}>{sf.sf_name}</Select.Option>)
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
                  this.setState({
                    createModalVisible: true,
                  })     
                }}
                type="primary"
              >
                Create System Function
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
        <CreateForm
          systemData={systemData}
          onSubmit={async (value: SystemFunctionItemType) => {
            const success = await handleSystemFunctionAdd(value);
            const { dispatch } = this.props;

            if (success) {
              this.setState({
                createModalVisible: false,
              })

              // console.log('sffffff');
              dispatch({
                type: 'CareProcessSpace/fetchSystemFunction',
                payload: {
                },
              }).then((data) => {
                systemfunctionData = data;
              });

            }
          }}
          onCancel={() => {              
            this.setState({
            createModalVisible: false,
            })     
        }}
          modalVisible={this.state.createModalVisible}
        />
      </div>
    );
  }
}

export default connect(
  ({
    CareProcessSpace,
    MenuSpace,
    loading,
     }: {
    CareProcessSpace: CareProcessState;
    MenuSpace: MenuState;
    loading: {
      models: { [key: string]: boolean };
    };
    }) => ({
    CareProcessSpace,
    MenuSpace,
    loading: loading.models.CareProcessSpace,
  }),
)(SystemFunctionAssociation);
