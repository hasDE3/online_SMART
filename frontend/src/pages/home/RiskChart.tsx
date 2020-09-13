/**
 * 'RiskChart.tsx' defines the navigation diagram in the right side of the dashboard.
 * The diagram is rendered when the page loads through 'GGEditor'.
 * 
 */

import React from 'react';
import GGEditor, { Flow } from 'gg-editor';
import styles from './index.less';
import { withPropsAPI } from "gg-editor";
import { Col, Row, Button, Descriptions, Card, Form, Divider, Table, Select, Tabs, Input, Space, message } from 'antd';
import { history } from 'umi';

GGEditor.setTrackable(false);

const color1: string = '#ffadd2';
const color2: string = '#9254de';
const color3: string = '#50a0c3';
const color4: string = '#f2f3af'
const color5: string = '#f9f0ff';

/**
 * 'data' defines the risk diagram.
 * 
 */
const data = {
  nodes: [
    {
      id: 'hitsafety',
      label: 'HIT Safety',
      x: 235,
      y: 55,
      shape: 'flow-rect',
      color: color1,
    },
    {
      id: 'hit',
      shape: 'flow-capsule',
      label: 'HIT',
      x: 55,
      y: 55,
      color: color3,
    },
    {
      id: 'caresetting',
      shape: 'flow-capsule',
      label: 'Care Setting',
      x: 415,
      y: 55,
      color: color3,
    },
    {
      id: 'riskstrategy',
      shape: 'flow-rhombus',
      label: 'Risk Strategy',
      color: color2,
      x: 235,
      y: 155,
    },
    {
      id: 'hazardlog',
      shape: 'flow-capsule',
      label: 'Hazard Log',
      x: 55,
      y: 155,
      color: color3,
    },
    {
      id: 'residualrisks',
      label: 'Residual Risks',
      x: 235,
      y: 255,
      shape: 'flow-rect',
      color: color1,
    },
    {
      id: 'acceptedrisk',
      shape: 'flow-capsule',
      label: 'Accepted Risk',
      x: 55,
      y: 255,
      color: color5,
    },
    {
      id: 'clinicalrisk',
      shape: 'flow-capsule',
      label: 'Clinical Risk \n Matrix',
      x: 415,
      y: 255,
      color: color3,
    },
    {
      id: 'controlledrisk',
      label: 'Controlled Risk',
      x: 175,
      y: 355,
      shape: 'flow-rect',
      color: color1,
    },
    {
      id: 'clinicalbenefits',
      label: 'Clinical Benefits',
      x: 305,
      y: 355,
      shape: 'flow-rect',
      color: color1,
    },
    {
      id: 'acceptablerisklevels',
      shape: 'flow-capsule',
      label: 'Acceptable Risk \n Levels',
      x: 55,
      y: 355,
      color: color5,
    },
    {
      id: 'unacceptablerisklevels',
      shape: 'flow-capsule',
      label: 'Unacceptable \n Risk Levels',
      x: 425,
      y: 355,
      color: color5,
    },
    {
      id: 'hl1',
      shape: 'flow-circle',
      label: 'HL 1',
      x: 175,
      y: 435,
      color: color4,
    },
    {
      id: 'hl2',
      shape: 'flow-circle',
      label: 'HL 2',
      x: 305,
      y: 435,
      color: color4,
    },

  ],
  edges: [
    {
      source: 'hitsafety',
      target: 'hit',
    },
    {
      source: 'hitsafety',
      target: 'caresetting',
    },
    {
      source: 'hitsafety',
      target: 'riskstrategy',
    },
    {
      source: 'riskstrategy',
      target: 'hazardlog',
    },
    {
      source: 'riskstrategy',
      target: 'residualrisks',
    },
    {
      source: 'residualrisks',
      target: 'acceptedrisk',
    },
    {
      source: 'residualrisks',
      target: 'clinicalrisk',
    },
    {
      source: 'residualrisks',
      target: 'controlledrisk',
    },
    {
      source: 'residualrisks',
      target: 'clinicalbenefits',
    },
    {
      source: 'controlledrisk',
      target: 'acceptablerisklevels',
    },
    {
      source: 'clinicalbenefits',
      target: 'unacceptablerisklevels',
    },
    {
      source: 'controlledrisk',
      target: 'hl1',
    },
    {
      source: 'clinicalbenefits',
      target: 'hl2',
    },
  ],
};
class RiskChart extends React.Component {
    constructor(props) {
      super(props);

    }

    handleNodeClick = (e) => {
      let clicked: boolean = false;

      if (e.item.model.id == 'hit') {
        clicked = true;
        history.push({
          pathname: '/systemfunction',
          query: {            
          },
        });
      }

      if (e.item.model.id == 'caresetting') {
        clicked = true;
        history.push({
          pathname: '/caresettings',
          query: {            
          },
        });
      }

      if (e.item.model.id == 'hazardlog') {
        clicked = true;
        history.push({
          pathname: '/hazardexplorer/list',
          query: {            
          },
        });
      }

      if (e.item.model.id == 'clinicalrisk') {
        clicked = true;
        history.push({
          pathname: '/riskmatrix',
          query: {            
          },
        });
      }

      if (clicked) {
        window.location.reload();
      }
      
    }

    render() {
      // Don't know why
      // But this code does the job
      const graphConfig = ({ 
        modes: { 
          default: [{
            type: 'drag-canvas'            
          }]
        } 
      });

      return (
        <div>
        <GGEditor
        className={styles.editor}
        >
          <Row className={styles.editorBd}>
            <Col span={24} className={styles.editorContent}>
              <Flow
                //graph={{ mode: 'readOnly' }}
                graph={graphConfig}
                className={styles.flow}
                noEndEdge={ false }
                data={data}
                onNodeDragStart={e => {
                  //console.log('onNodeDragStart', e);
                  const { item } = e;
                  const graph = item.getGraph();
                  graph.emit('drop'); 
                }}

                onNodeClick={(e) => {
                  this.handleNodeClick(e)
                }}

              />
            </Col>
          </Row>
        </GGEditor>
        </div>
      )
    }
}

export default withPropsAPI(RiskChart);