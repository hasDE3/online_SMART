/**
 * 'BowtieConfiguration.tsx' defines the toolbox in the canvas.
 * Similar to the FlowConfiguration in the 'Care Process Editor'.
 */

import React from "react";
import { withPropsAPI } from "gg-editor";
import { Button, Row, Col } from 'antd';

class BowtieConfiguration extends React.Component {
  
  constructor(props:any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    // Update canvas when data changes
    const { propsAPI } = this.props;
    propsAPI.read(this.props.mindData);

  }

  handleClick = (data) => {
    const { propsAPI } = this.props;
    
    propsAPI.read(data);
    propsAPI.executeCommand('autoZoom');
    //console.log(propsAPI.save());
  };

  handleCommand = (command: string) => {
    const { propsAPI } = this.props;
    // Execute commands
    propsAPI.executeCommand(command);
    //console.log(propsAPI.save());
  };

  render() {
    return (
        <div>
          <Row gutter={[8, 8]}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  this.handleClick(this.props.mindData) 
                }} 
              >
                Refresh
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  this.handleCommand('zoomIn')
                }} 
              >
                Zoom In
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  this.handleCommand('zoomOut')
                }} 
              >
                Zoom Out
              </Button>
            </Col>
          </Row>
        </div>
    );
  }
}

export default withPropsAPI(BowtieConfiguration);