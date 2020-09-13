/**
 * 'DataDisplay.tsx' defines the function that fetches the number of items in each component.
 * The component includs Care Setting, Hazard Insatnce, System Function, Process System.
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Row, Col, Descriptions } from 'antd';
import styles from './style.less';
import { history } from 'umi';
import { DashboardState } from './models/DashboardModel';
import { connect, Dispatch } from 'umi';
import { ReconciliationOutlined, PartitionOutlined, WindowsOutlined, FileSearchOutlined, IssuesCloseOutlined, ExceptionOutlined } from '@ant-design/icons';

interface DataDisplayProps {
  dispatch: Dispatch<any>;
  DashboardSpace: DashboardState;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  dispatch,
  DashboardSpace: { rmData, hiData, csData, htData, syData, sfData, psData },
}) => {

  const [cs_length, setCS_length] = useState(0);
  const [hi_length, setHI_length] = useState(0);
  const [sf_length, setSF_length] = useState(0);
  const [ps_length, setPS_length] = useState(0);

  useEffect(() => {
    dispatch({
      type: 'DashboardSpace/fetchProcessSystem',
      payload: {
      },
    }).then((data) => {    
      setPS_length(data.length);
      //console.log(hi_length);
      //console.log(data.length);
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'DashboardSpace/fetchSystemFunction',
      payload: {
      },
    }).then((data) => {    
      setSF_length(data.length);
      //console.log(hi_length);
      //console.log(data.length);
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'DashboardSpace/fetchHazardInstance',
      payload: {
      },
    }).then((data) => {    
      setHI_length(data.length);
      //console.log(hi_length);
      //console.log(data.length);
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'DashboardSpace/fetchCareSetting',
      payload: {
      },
    }).then((data) => {    
      setCS_length(data.length);
      //console.log(cs_length);
      //console.log(data.length);
    });
  }, []);


  const projectData = [
    {
      id: 'caresetting',
      title: 'Care Setting',
      description: `View and edit care setting descriptions`,
      detail: `${cs_length} Care Setting(s)`,
      icon: <ReconciliationOutlined />,
    },
    {
      id: 'systemfunction',
      title: 'System Function',
      description: 'View and edit system definitions',
      detail: `${sf_length} System Function(s)`,
      icon: <WindowsOutlined />,
    },
    {
      id: 'hazardlog',
      title: 'Hazard Log',
      description: 'View and edit lists of hazards and assocaited clinical risks',
      detail: `${hi_length} Hazard Instance(s)`,
      icon: <FileSearchOutlined />,
    },
    {
      id: 'careprocess',
      title: 'Care Process',
      description: 'View and edit care process diagrams',
      detail: `${ps_length} Care Process System(s)`,
      icon: <PartitionOutlined />,
    },
    {
      id: 'riskmatrix',
      title: 'Risk Matrix',
      description: 'View and edit the risk matrix of the project',
      detail: ``,
      icon: <ExceptionOutlined  />,
    },
    {
      id: 'issuelog',
      title: 'Issue Log',
      description: 'View and edit outstanding test issues',
      detail: ``,
      icon: <IssuesCloseOutlined />,
    },

  ];

  const handleCardLink = (title: string) => {
    if (title === 'Care Setting') {
      history.push({
        pathname: '/caresettings',
        query: {            
        },
      })
    }

    if (title === 'System Function') {
      history.push({
        pathname: '/systemfunction',
        query: {            
        },
      });
    }

    if (title === 'Hazard Log') {
      history.push({
        pathname: '/hazardexplorer/list',
        query: {            
        },
      });
    }

    if (title === 'Care Process') {
      history.push({
        pathname: '/CareProcessEditor',
        query: {            
        },
      });
    }

    if (title === 'Issue Log') {
      history.push({
        pathname: '/issuelog2',
        query: {            
        },
      });
    }

    if (title === 'Risk Matrix') {
      history.push({
        pathname: '/riskmatrix',
        query: {            
        },
      });
    }

  };

  return (
    <div>
      <Card
        className={styles.projectList}
        style={{ marginBottom: 24 }}            
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        {projectData.map((item) => (
          <Card.Grid className={styles.projectGrid} key={item.id}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Card.Meta
                title={                    
                  <div className={styles.cardTitle}>                                       
                    <Button
                      block
                      icon={item.icon}
                      size="small"
                      type="primary"
                      onClick={() => handleCardLink(item.title)}
                    >
                      {item.title}
                    </Button>                                   
                  </div>
                }                
                description={item.description}                
              />
              <div className={styles.projectItemContent}>
                <Descriptions>
                  <Descriptions.Item>
                    {item.detail}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Card>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};


export default connect(
  ({
    DashboardSpace,
  }: {
    DashboardSpace: DashboardState;
  }) => ({
    DashboardSpace,    
  }),
)(DataDisplay);
