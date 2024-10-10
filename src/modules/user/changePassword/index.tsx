import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { Button, DatePicker, Form, FormProps, Input, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import GeneralLoading from '../../../components/base/GeneralLoading';
import { authService } from '../../../services';
import { toast } from 'react-toastify';
import { IChangePass } from '../../../types/auth.tyes';

type FieldType = {
  oldPassword: string;
  newPassword: string;
};

export default function ChangePassword() {
  const [form] = Form.useForm();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = React.useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const data: IChangePass = {
      userId: user.id,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      setLoading(true);
      const rs = await authService.changePassword(data);
      toast.success(rs.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 rounded-2xl border-[2px] border-blue-500 border-dotted flex flex-col justify-center items-center w-full">
      <Form
        className="w-full mt-5"
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        name="form"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="Old password" name="oldPassword">
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> label="New password" name="newPassword">
          <Input.Password />
        </Form.Item>

        <div className="w-full flex justify-end items-end">
          <Button type="primary" htmlType="submit">
            Change password
          </Button>
        </div>
      </Form>
      <GeneralLoading isLoading={loading} />
    </div>
  );
}
