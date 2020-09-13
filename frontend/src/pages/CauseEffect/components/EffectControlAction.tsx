import React, { FC, useEffect, useRef } from 'react';
import { Modal, Form, Input, Select, Row, Col, Checkbox } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { CauseEffectState } from '@/models/CauseEffectModel';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';

let effectData: EffectItemType[] = [];

interface EffectControlActionProps {
  CauseEffectSpace: CauseEffectState;
  currentSelect: string;
	dispatch: Dispatch<any>;
	done: boolean;
  visible: boolean;
  associatedHazardInstanceID: string;
  ehi: EffectItemType[];
	current: Partial<EffectControlItemType> | undefined;
	onDone: () => void;
	onSubmit: (values: EffectControlItemType) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};

const EffectControlAction: FC<EffectControlActionProps> = (props) => {
	const [form] = Form.useForm();
	const { dispatch, done, visible, current, onDone, onCancel, onSubmit, currentSelect, CauseEffectSpace, associatedHazardInstanceID, ehi } = props;
	
	useEffect(() => {

    if (form && !visible) {
      form.setFieldsValue({
        ...current,
        });
    }
	}, [props.visible]);

	useEffect(() => {
    if (current) {
      let efcoTypeData: string[] = [];
      if (current.efco_type) {
        efcoTypeData = current.efco_type.split(';');
      }

      form.setFieldsValue({
      ...current,
      });

      form.setFieldsValue({
        efco_type: efcoTypeData,
      })
    } else {
      form.resetFields();
    }
	}, [props.current]);

	useEffect(() => {
    console.log('Starting');
    console.log(associatedHazardInstanceID);    
    FilterEffectData(associatedHazardInstanceID);
  }, []);
  
  /** Actually this is enough
   *  FilterCauseData can be deleted
   */
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      effectData = [];
      if (effectData.length == 0) {
        for(let i: number = 0; i < ehi.length; i++) {
          effectData.push(ehi[i]);
        }
      }
    }
  });

  const FilterEffectData = (hiID: string) => {
    effectData = [];
    dispatch({
    	type: 'CauseEffectSpace/fetchEffect',
      payload: {
        ef_hi: associatedHazardInstanceID,
      },
    }).then((data: EffectItemType[]) => {
      if (effectData.length == 0) {
        for(let i: number = 0; i < data.length; i++) {
          effectData.push(data[i]);
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
			onSubmit(values as EffectControlItemType);
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
            name="efco_name"
            label="Name"
            rules={[{ required: true, message: 'Effect Control Name' }]}
					>
						<Input placeholder="Please Input" />
					</Form.Item>
          
          <Form.Item
            name="efco_ef"
            label="Associated Effect"            
            rules={[{ required: true, message: 'Associated Effect' }]}
          >
            <Select style={{ width: 320 }} >
              {
                effectData.map( (ef) => (
                  <Select.Option key={ef.id} value={ef.id}>{ef.ef_name}</Select.Option>)
                )
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="efco_state"
            label="State"            
            rules={[{ required: true, message: 'Effect Control State' }]}
          >
            <Select style={{ width: 320 }} >
              <Select.Option value="additional">Additional</Select.Option>
              <Select.Option value="existing">Existing</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="efco_type"
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
            name="efco_desc"
            label="Description"
          >
            <TextArea rows={4} placeholder="Effect Control Description" />
          </Form.Item>

			</Form>
			);
	};

	return (
		<Modal
			title={done ? null : `${current ? 'Edit ' : ' Add '}Effect Control`}
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
) (EffectControlAction);