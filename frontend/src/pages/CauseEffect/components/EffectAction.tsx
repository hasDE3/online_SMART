/**
 * 'EffectAction.tsx' defines the functions that realted to Effect in Hazard Instance
 */

import React, { FC, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { connect, Dispatch, history } from 'umi';
//import { CauseEffectState } from '@/models/CauseEffectModel';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';
import { HazardInstanceItemType } from '../data';
//import { EditHazardInstanceState } from '@/pages/EditHazardInstance/models/EditHazardInstanceModel';

//let hazardinstanceData: HazardInstanceItemType[] = [];
const { Option } = Select;

interface EffectActionProps {
	hazardinstanceData: HazardInstanceItemType[];
	currentSelect: string;
	done: boolean;
	visible: boolean;
	current: Partial<EffectItemType> | undefined;
	onDone: () => void;
	onSubmit: (values: EffectItemType) => void;
	onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};

const EffectAction: FC<EffectActionProps> = (props) => {
	const [form] = Form.useForm();
	const { done, visible, current, onDone, onCancel, onSubmit, hazardinstanceData, currentSelect } = props;
	
	useEffect(() => {
		if (form && !visible) {
			form.setFieldsValue({
				...current,
				});
		}
	}, [props.visible]);

	useEffect(() => {
		if (current) {
			form.setFieldsValue({
			...current,
			});

			if (current.ef_hi) {
				form.setFieldsValue({
					ef_hi: current.ef_hi,
				})
			}
		} else {
			form.resetFields();
		}
	}, [props.current]);

	const handleSubmit = () => {
		if (!form) return;
		form.submit();
	};

	const handleFinish = (values: { [key: string]: any }) => {
		if (onSubmit) {
			onSubmit(values as EffectItemType);
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
				name="ef_name"
				label="Name"
				rules={[{ required: true, message: 'Effect Name' }]}
				>
					<Input placeholder="Please Input" />
				</Form.Item>

				<Form.Item
					name="ef_hi"
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
				name="ef_desc"
				label="Description"
				>
				<TextArea rows={4} placeholder="Effect Description" />
				</Form.Item>
			</Form>
		);
	};

	return (
		<Modal
			title={done ? null : `${current ? 'Edit ' : ' Add '}Effect`}
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

export default EffectAction;