/**
 * 'CauseAction.tsx' defines the functions that realted to Cause in Hazard Instance
 */

import React, { FC, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { CauseEffectState } from '@/models/CauseEffectModel';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';
import { HazardInstanceItemType } from '../data';
import { EditHazardInstanceState } from '@/pages/EditHazardInstance/models/EditHazardInstanceModel';

let hazardinstanceData: HazardInstanceItemType[] = [];
const { Option } = Select;

interface CauseActionProps {
	currentSelect: string;
	CauseEffectSpace: CauseEffectState;
	EditHazardInstanceSpace: EditHazardInstanceState;
	dispatch: Dispatch<any>;
	done: boolean;
	visible: boolean;
	current: Partial<CauseItemType> | undefined;
	onDone: () => void;
	onSubmit: (values: CauseItemType) => void;
	onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};


const CauseAction: FC<CauseActionProps> = (props) => {
	const [form] = Form.useForm();
	const { dispatch, done, visible, current, onDone, onCancel, onSubmit, currentSelect, CauseEffectSpace, EditHazardInstanceSpace } = props;
	
	
	useEffect(() => {
			if (form && !visible) {
				form.setFieldsValue({
					...current,
					});
			/**form.resetFields();*/
			}
	}, [props.visible]);

	useEffect(() => {
		console.log('eiwo');
		console.log(current);
		if (current) {
			form.setFieldsValue({
			...current,
			});

			if (current.ca_hi) {
				form.setFieldsValue({
					ca_hi: current.ca_hi,
				})
			}
		} else {
			form.resetFields();
		}


	}, [props.current]);

	useEffect(() => {
    dispatch({
    	type: 'CauseEffectSpace/fetchCause',
      payload: {   
      },
    });
	}, []);

	
	useEffect(() => {
    hazardinstanceData = [];
    dispatch({
    	type: 'EditHazardInstanceSpace/fetchHazardInstance',
      payload: {   
      },
    }).then((data: HazardInstanceItemType[]) => {
      if (hazardinstanceData.length == 0) {
        for(let i: number = 0; i < data.length; i++) {
          hazardinstanceData.push(data[i]);
        }
      }
    })
	}, []);

	const handleSubmit = () => {
			if (!form) return;
			form.submit();
	};

	const handleFinish = (values: { [key: string]: any }) => {
			if (onSubmit) {
			onSubmit(values as CauseItemType);
			}
	};

	const modalFooter = done
			? { footer: null, onCancel: onDone }
			: { okText: 'OK', onOk: handleSubmit, onCancel };

	const getModalContent = () => {
			if (done) {
				// TODO
				//window.location.reload();
				//onDone;
				if (currentSelect == "all") {
					window.location.reload();
				} else {
					//onDone;
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
				name="ca_name"
				label="Name"
				rules={[{ required: true, message: 'Cause Name' }]}
				>
					<Input placeholder="Please Input" />
				</Form.Item>

				<Form.Item
					name="ca_hi"
					label="Hazard Instance"
					rules={[{ required: true, message: 'Associated Hazard Instance' }]}
				>
					<Select style={{ width: 320 }} >
						{
							hazardinstanceData.map( (hi) => (
								<Select.Option key={hi.pk} value={hi.pk}>{hi.hi_name}</Select.Option>)
							)
						}
					</Select>
				</Form.Item>

				<Form.Item
				name="ca_desc"
				label="Description"
				>
				<TextArea rows={4} placeholder="Cause Description" />
				</Form.Item>
			</Form>
			);
	};

	return (
		<Modal
			title={done ? null : `${current ? 'Edit ' : ' Add '}Cause`}
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
		EditHazardInstanceSpace,
  }: {
		CauseEffectSpace: CauseEffectState;    
		EditHazardInstanceSpace: EditHazardInstanceState;
  }) => ({
		CauseEffectSpace,
		EditHazardInstanceSpace,
  }),
) (CauseAction);