import React, { FC, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { ProcessSystemItemType } from '@/pages/CareProcessEditor/data';
import { connect, Dispatch } from 'umi';
import { CareProcessState } from '@/pages/CareProcessEditor/models/CareProcessModel';
import styles from '../style.less';

interface ProcessSystemActionProps {
	CareProcessSpace: CareProcessState;
	dispatch: Dispatch<any>;
	done: boolean;
	visible: boolean;
	current: Partial<ProcessSystemItemType> | undefined;
	onDone: () => void;
	onSubmit: (values: ProcessSystemItemType) => void;
	onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};


const ProcessSystemAction: FC<ProcessSystemActionProps> = (props) => {
	const [form] = Form.useForm();
	const { dispatch, done, visible, current, onDone, onCancel, onSubmit, CareProcessSpace } = props;
	
	
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
    	type: 'CareProcessSpace/fetchProcessSystem',
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
			onSubmit(values as ProcessSystemItemType);
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
					name="ps_name"
					label="Name"
					rules={[{ required: true, message: 'Process System Name' }]}
					>
							<Input placeholder="Please Input" />
					</Form.Item>

					<Form.Item
					name="ps_desc"
					label="Description"
					>
					<TextArea rows={4} placeholder="Process System Description" />
					</Form.Item>
			</Form>
			);
	};

	return (
		<Modal
			title={done ? null : `${current ? 'Edit ' : ' Add '}Process System`}
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
		CareProcessSpace,
		loading,
  }: {
    CareProcessSpace: CareProcessState;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    CareProcessSpace,
    loading: loading.models.CareProcessSpace,
  }),
) (ProcessSystemAction);