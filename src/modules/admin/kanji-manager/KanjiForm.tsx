import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Tooltip,
} from 'antd';
import React, { useMemo, useState } from 'react';
import { IKanji, ILevelKanji } from '../../../types/kanji.types';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { kanjiService } from '../../../services';
import GeneralLoading from '../../../components/base/GeneralLoading';

interface IProps {
  kanji?: IKanji;
  modalVisible: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}

type FieldType = {
  character?: string;
  level?: ILevelKanji;
  meaning?: string;
  chinaMeaning?: string;
  mnemonic?: string;
  kunReading?: string;
  onReading?: string;
};

interface IExample {
  id: any;
  value: string;
}

export default function KanjiForm({
  kanji,
  modalVisible,
  handleOk,
  handleCancel,
}: IProps) {
  const initialExamples = useMemo(() => {
    return kanji?.exampleKanjis.map((item) => ({
      id: item.id,
      value: item.example,
    }));
  }, [kanji]);
  const [form] = Form.useForm();
  const [examples, setExamples] = useState<IExample[]>(initialExamples ?? []);

  const [loading, setLoading] = useState(false);

  const addInput = () => {
    setExamples([...examples, { id: Date.now(), value: '' }]);
  };

  const handleChange = (id: any, value: string) => {
    setExamples(
      examples.map((input) => (input.id === id ? { ...input, value } : input)),
    );
  };

  const handleDeleteExample = (item: IExample) => {
    setExamples(examples.filter((input) => input.id !== item.id));
  };

  const onCreateKanji = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const rs = kanji
        ? await kanjiService.updateKanji(kanji.id, data)
        : await kanjiService.createKanji(data);
      toast.success(rs.message);
      handleOk();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreateKanji({
          ...values,
          exampleKanjis: examples.map((item) => item.value).reverse(),
        });
      })
      .catch((info) => {
        toast.error(info.message);
      });
  };

  return (
    <>
      <Modal
        title={`${kanji ? 'Edit kanji' : 'Create new kanji'}`}
        centered
        destroyOnClose
        loading={loading}
        width={800}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form
          className="w-full mt-5"
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="form"
          initialValues={{
            character: kanji?.character,
            level: kanji?.level ?? 'N5',
            meaning: kanji?.meaning,
            chinaMeaning: kanji?.chinaMeaning,
            mnemonic: kanji?.mnemonic,
            onReading: kanji?.onReading,
            kunReading: kanji?.kunReading,
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Character"
            name="character"
            rules={[{ required: true, message: 'Please input character' }]}
          >
            <Input disabled={Boolean(kanji)} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Level"
            name="level"
            rules={[{ required: true, message: 'Please input level' }]}
          >
            <Radio.Group>
              <Radio value={'N1'}>N1</Radio>
              <Radio value={'N2'}>N2</Radio>
              <Radio value={'N3'}>N3</Radio>
              <Radio value={'N4'}>N4</Radio>
              <Radio value={'N5'}>N5</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item<FieldType>
            label="Kanji radicals"
            name="chinaMeaning"
            rules={[{ required: true, message: 'Please input kanji radicals' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Onyomi"
            name="onReading"
            rules={[{ required: true, message: 'Please input Onyomi reading' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Kunyomi"
            name="kunReading"
            rules={[
              { required: true, message: 'Please input Kunyomi reading' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Meaning" name="meaning">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Mnemonic" name="mnemonic">
            <Input />
          </Form.Item>

          {examples.map((item, index) => (
            <Form.Item key={item.id} label={`Example ${index + 1}`}>
              <div className="flex flex-row justify-between items-center">
                <Input
                  value={item.value}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  placeholder={`Enter example ${index + 1}`}
                />
                <Tooltip title="delete">
                  <Button
                    onClick={() => {
                      handleDeleteExample(item);
                    }}
                    className="ms-3"
                    variant="solid"
                    color="danger"
                    shape="default"
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </div>
            </Form.Item>
          ))}

          <Form.Item>
            <Space>
              <Button type="dashed" onClick={addInput}>
                Add new example
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <GeneralLoading isLoading={loading} />
    </>
  );
}
