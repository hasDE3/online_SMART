/**
 *  Dashboard
 *  Left side Shortcuts - './DataDisplay.tsx'
 *  Right side Risk Diagram - './RiskChart.tsx'
 * 
 */

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Row, Col } from 'antd';
import RiskChart from './RiskChart';
import DataDisplay from './DataDisplay';
import styles from './style.less';


const Home: React.FC<{}> = () => {

  return (
    <PageHeaderWrapper title="Dashboard">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card title="Introduction">
            <p>This is a web version of the Safety Modelling, Assurance and Reporting Toolset (SMART).</p>
            <p>SMART helps integrate the design of the digital health system(s), the modelling of the care setting and the safety analysis evidence in a self-contained and partially-automated assurance environment.</p>
            <p></p>
          </Card>
        </Col>
      </Row>

      <Row gutter={6}>
        <Col span={12}>
          <Card title="Shortcuts">
            <DataDisplay />
          </Card>
        </Col>

        <Col span={12}>          
          <Card title="Risk Chart">
            <RiskChart />
          </Card>
        </Col>
      </Row>


    </PageHeaderWrapper>
  );
};

export default (Home);
