import React, { FC, useEffect, useRef } from 'react';
import { Modal, Form, Input, Select, Row, Col, Checkbox } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { CauseEffectState } from '@/models/CauseEffectModel';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';

let causeData: CauseItemType[] = [];

interface CauseControlActionProps {
  currentSelect: string;
	CauseEffectSpace: CauseEffectState;	
	dispatch: Dispatch<any>;
	done: boolean;
  visible: boolean;
  associatedHazardInstanceID: string;
  ahi: CauseItemType[];
	current: Partial<CauseControlItemType> | undefined;
	onDone: () => void;
	onSubmit: (values: CauseControlItemType) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};

const CauseControlAction: FC<CauseControlActionProps> = (props) => {
	const [form] = Form.useForm();
	const { dispatch, done, visible, current, onDone, onCancel, onSubmit, currentSelect, CauseEffectSpace, associatedHazardInstanceID, ahi } = props;
	
	useEffect(() => {

    if (form && !visible) {
      form.setFieldsValue({
        ...current,
        });
    }
	}, [props.visible]);

	useEffect(() => {
    if (current) {
      // Transform data from string to array
      // So that the checkbox can read it
      let cacoTypeData: string[] = [];
      if (current.caco_type) {
        cacoTypeData = current.caco_type.split(';');
      }

      form.setFieldsValue({
      ...current,
      });

      form.setFieldsValue({
        caco_type: cacoTypeData,
      })
    } else {
      form.resetFields();
    }
	}, [props.current]);

	useEffect(() => {
    console.log('Starting');
    console.log(associatedHazardInstanceID);    
    FilterCauseData(associatedHazardInstanceID);
  }, []);
  
  /** Actually this is enough
   *  FilterCauseData can be deleted
   */
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      causeData = [];
      if (causeData.length == 0) {
        for(let i: number = 0; i < ahi.length; i++) {
          causeData.push(ahi[i]);
        }
      }
    }
  });

  const FilterCauseData = (hiID: string) => {
    causeData = [];
    dispatch({
    	type: 'CauseEffectSpace/fetchCause',
      payload: {
        ca_hi: associatedHazardInstanceID,
      },
    }).then((data: CauseItemType[]) => {
      if (causeData.length == 0) {
        for(let i: number = 0; i < data.length; i++) {
          causeData.push(data[i]);
        }
      }
    })
  } 

	const handleSubmit = () => {
			if (!form) return;
			form.submit();
	};

	const handleFinish = (values: { [key: string]: any }) => {
			if (onSubmit) {
			onSubmit(values as CauseControlItemType);
			}
	};

	const modalFooter = done
			? { footer: null, onCancel: onDone }
			: { okText: 'OK', onOk: handleSubmit, onCancel };

	const getModalContent = () => {
			if (done) {
				// TODO
        // Can be optimized
        // It does not need to refresh the page
        if (currentSelect == "all") {
          window.location.reload();
        } else {
          history.push({
            pathname: '/hazardexplorer/causeeffect/',
            query: {
              pk: currentSelect,
            },
          })
          window.location.reload();
        }
			}
			return (
			<Form {...formLayout} form={form} onFinish={handleFinish}>

					<Form.Item
            name="caco_name"
            label="Name"
            rules={[{ required: true, message: 'Cause Control Name' }]}
					>
						<Input placeholder="Please Input" />
					</Form.Item>
          
          <Form.Item
            name="caco_ca"
            label="Associated Cause"            
            rules={[{ required: true, message: 'Associated Cause' }]}
          >
            <Select style={{ width: 320 }} >
              {
                causeData.map( (ca) => (
                  <Select.Option key={ca.id} value={ca.id}>{ca.ca_name}</Select.Option>)
                )
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="caco_state"
            label="State"            
            rules={[{ required: true, message: 'Cause Control State' }]}
          >
            <Select style={{ width: 320 }} >
              <Select.Option value="additional">Additional</Select.Option>
              <Select.Option value="existing">Existing</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="caco_type"
            label="Type"
          >           
            <Checkbox.Group>
              <Row>
                <Col>
                  <Checkbox value="design">Design</Checkbox>
                </Col>

                <Col>
                  <Checkbox value="test">Test</Checkbox>
                </Col>

                <Col>
                  <Checkbox value="training">Training</Checkbox>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Checkbox value="Business">Business Process Change</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            name="caco_desc"
            label="Description"
          >
            <TextArea rows={4} placeholder="Cause Control Description" />
          </Form.Item>

			</Form>
			);
	};

	return (
		<Modal
			title={done ? null : `${current ? 'Edit ' : ' Add '}Cause Control`}
			width={640}
			bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
			destroyOnClose
			visible={visible}
			{...modalFooter}
		>
			{getModalContent()}
		</Modal>
	);
};

export default connect(
	({
		CauseEffectSpace,		
  }: {
    CauseEffectSpace: CauseEffectState;    
  }) => ({
    CauseEffectSpace,
  }),
) (CauseControlAction);