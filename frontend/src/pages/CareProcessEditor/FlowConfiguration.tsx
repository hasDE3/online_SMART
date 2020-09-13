/**
 * 'FlowConfiguration.tsx' defines the extra functions GGEditor needs.
 * It can only be used inside GGEditor and 
 * wraps with 'withPropsAPI'.
 *  
 */
import React from "react";
import { withPropsAPI } from "gg-editor";
import { Button, Row, Col } from 'antd';

class FlowConfiguration extends React.Component {
  
  constructor(props:any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Can be deleted
  componentDidMount() {
    console.log('DidMount');
    console.log(this.props.flowData);
  }

  componentDidUpdate() {
    const { propsAPI } = this.props;
    propsAPI.read(this.props.flowData);
    if (this.props.newFlowData) {
      console.log('AutoZoom!');
      //propsAPI.read(this.props.flowData);
      propsAPI.executeCommand('autoZoom');      
      //console.log(propsAPI.save());
      //propsAPI.executeCommand('collapseExpand');
      /**
      for (let i: number = 0; i < 5; i++) {
        propsAPI.executeCommand('autoZoom');
      }  */    
      //this.handleClick(this.props.flowData);
    }
    //propsAPI.executeCommand('resetZoom');

    //console.log('Did Update');
    //console.log(this.props.flowData);
    //console.log(propsAPI.save());
    //propsAPI.executeCommand('autoZoom');
    //this.handleClick(this.props.flowdata)
  }

  componentWillUnmount() {
    // TODO
    // Unmount some componenets
  }

  handleClick = (data) => {
    const { propsAPI } = this.props;
    
    propsAPI.read(data);
    propsAPI.executeCommand('autoZoom');
    console.log(propsAPI.save());
  };

  handleCommand = (command: string) => {
    const { propsAPI } = this.props;
    
    propsAPI.executeCommand(command);
    console.log(propsAPI.save());
  };

  render() {
    return (
        <div>
          <Row gutter={[8, 8]}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  this.handleClick(this.props.flowData) 
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

export default withPropsAPI(FlowConfiguration);