import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { Button, DatePicker, Form, FormProps, Input, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import GeneralLoading from '../../../components/base/GeneralLoading';
import { profileService } from '../../../services';
import { toast } from 'react-toastify';
import { setUser } from '../../../lib/reducer/userSlice';

type FieldType = {
  email: string;
  userName?: string;
  fullName?: string;
  gender?: string;
  birthDay?: Dayjs | null;
  phoneNumber?: number;
};

export default function Profile() {
  const [form] = Form.useForm();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const formattedDate = values.birthDay
      ? values.birthDay.format('DD/MM/YYYY')
      : '';
    const data = { ...values, birthDay: formattedDate };
    try {
      setLoading(true);
      const rs = await profileService.updateKanji(user.id, data);
      console.log("🚀 ~ constonFinish:FormProps<FieldType>['onFinish']= ~ rs:", rs.data);
      dispatch(setUser({...user, ...rs.data}));
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
        initialValues={{
          email: user.email,
          userName: user.userName,
          fullName: user.fullName,
          gender: user.gender ?? 'Male',
          birthDay: user.birthDay ? dayjs(user.birthDay) : null,
          phoneNumber: user.phoneNumber,
        }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input character' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType> label="User name" name="userName">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Full name" name="fullName">
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please input gender' }]}
        >
          <Radio.Group>
            <Radio value={'Male'}>Male</Radio>
            <Radio value={'Female'}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<FieldType> label="Date of birth" name="birthDay">
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>

        <Form.Item<FieldType> label="Phone number" name="phoneNumber">
          <Input type="number" />
        </Form.Item>

        <div className="w-full flex justify-end items-end">
          <Button type="primary" htmlType="submit">
            Update profile
          </Button>
        </div>
      </Form>
      <GeneralLoading isLoading={loading}/>
    </div>
  );
}
