/**
 * 'CreateSystemFunction.tsx' deinfes the function that creating/updating new System Function.
 */

import React, { FC, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { ListItemDataType } from '../data.d';
import { connect, Dispatch } from 'umi';
import { MenuState } from '../models/SystemModel';
import styles from '../style.less';
interface CreateSystemFunctionProps {
	MenuSpace: MenuState;
	dispatch: Dispatch<any>;
	done: boolean;
	visible: boolean;
	current: Partial<ListItemDataType> | undefined;
	onDone: () => void;
	onSubmit: (values: ListItemDataType) => void;
	onCancel: () => void;
	currentSelect: string;
}

const { TextArea } = Input;
const formLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};


const CreateSystemFunction: FC<CreateSystemFunctionProps> = (props) => {
	const [form] = Form.useForm();
	const { dispatch, done, visible, current, onDone, onCancel, onSubmit, MenuSpace, currentSelect } = props;
	
	useEffect(() => {
		if (form && !visible) {
			form.setFieldsValue({
				...current,
				});
			/**form.resetFields();*/
		}

		console.log(currentSelect);
		if (currentSelect != "all") {
			form.setFieldsValue({
				sf_parent: currentSelect.replace(/-/g,""),
			})
		}
	}, [props.visible]);

	useEffect(() => {
		if (current) {
			form.setFieldsValue({
			...current,
			/**createdAt: current.createdAt ? moment(current.createdAt) : null,*/
			});
		} else {
			form.resetFields();
		}
	}, [props.current]);

	useEffect(() => {
    dispatch({
    	type: 'MenuSpace/fetchMenu',
      /** Here the payload param will be transformed to 'effect' */
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
		onSubmit(values as ListItemDataType);
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
						name="sf_name"
						label="Name"
						rules={[{ required: true, message: 'System Function Name' }]}
					>
							<Input placeholder="Please Input" />
					</Form.Item>

					<Form.Item
						name="sf_parent"
						label="Associated System"
					>
						<Select  
							style={{ width: 200 }} 
							placeholder="Please select"								
							>
								{
									MenuSpace.menuData.map( (md) => {
										return (
											<Select.Option value={md.pk.replace(/-/g,"")} key={md.pk}>{md.sy_name}</Select.Option>
										)					
									})
								}
						</Select>	
					</Form.Item>

					<Form.Item
					name="sf_desc"
					label="Description"
					>
					<TextArea rows={4} placeholder="Please Input" />
					</Form.Item>
			</Form>
			);
	};

	return (
		<Modal
		title={done ? null : `${current ? 'Edit ' : ' Add '}System Function`}
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
		MenuSpace,
		loading,
  }: {
    MenuSpace: MenuState;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    MenuSpace,
    loading: loading.models.SystemSpace,
  }),
) (CreateSystemFunction);
