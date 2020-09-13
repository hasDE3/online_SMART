import React, { FC, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { HazardTypeItemType } from '../data.d';
import { connect, Dispatch } from 'umi';
import { HazardTypeState } from '../models/HazardTypeModel';
import { SingleHazardTypeState } from '../models/FetchSingleHazardType';
import styles from '../style.less';

interface HazardTypeActionProps {
	HazardTypeSpace: HazardTypeState;
	SingleHazardTypeSpace: SingleHazardTypeState;
	dispatch: Dispatch<any>;
	done: boolean;
	visible: boolean;
	current: Partial<HazardTypeItemType> | undefined;
	onDone: () => void;
	onSubmit: (values: HazardTypeItemType) => void;
	onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};


const HazardTypeAction: FC<HazardTypeActionProps> = (props) => {
	const [form] = Form.useForm();
	const { dispatch, done, visible, current, onDone, onCancel, onSubmit, HazardTypeSpace, SingleHazardTypeSpace } = props;
	
	
	useEffect(() => {
			if (form && !visible) {
				form.setFieldsValue({
					...current,
					});
			/**form.resetFields();*/
			}
	}, [props.visible]);

	useEffect(() => {
			if (current) {
					form.setFieldsValue({
					...current,
					});
			} else {
				form.resetFields();
			}
	}, [props.current]);

	useEffect(() => {
    dispatch({
    	type: 'HazardTypeSpace/fetchHazardType',
      payload: {   
      },
    });
	}, []);

	const handleSubmit = () => {
			if (!form) return;
			form.submit();
	};

	const handleFinish = (values: { [key: string]: any }) => {
			if (onSubmit) {
			onSubmit(values as HazardTypeItemType);
			}
	};

	const modalFooter = done
			? { footer: null, onCancel: onDone }
			: { okText: 'OK', onOk: handleSubmit, onCancel };

	const getModalContent = () => {
			if (done) {
				window.location.reload();
			}
			return (
			<Form {...formLayout} form={form} onFinish={handleFinish}>

					<Form.Item
					name="ht_name"
					label="Name"
					rules={[{ required: true, message: 'Hazard Type Name' }]}
					>
							<Input placeholder="Please Input" />
					</Form.Item>

					<Form.Item
					name="ht_desc"
					label="Description"
					>
					<TextArea rows={4} placeholder="Hazard Type Description" />
					</Form.Item>
			</Form>
			);
	};

	return (
		<Modal
			title={done ? null : `${current ? 'Edit ' : ' Add '}Hazard Type`}
			className={styles.standardListForm}
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
		HazardTypeSpace,
		loading,
  }: {
    HazardTypeSpace: HazardTypeState;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    HazardTypeSpace,
    loading: loading.models.HazardTypeSpace,
  }),
) (HazardTypeAction);
