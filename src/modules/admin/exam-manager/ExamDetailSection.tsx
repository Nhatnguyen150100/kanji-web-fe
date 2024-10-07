import React, { useState } from 'react';
import { IExamDetail, TExamInfo } from '../../../types/exam.types';
import { Input, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
  examProps?: IExamDetail;
}

export default function ExamDetailSection({ examProps }: IProps) {
  const [examInfo, setExamInfo] = useState<TExamInfo>({
    name: examProps?.name ?? '',
    level: examProps?.level ?? 'N5',
    timeFinish: examProps?.timeFinish ?? 0,
    description: examProps?.description ?? '',
  });
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-4 flex flex-col justify-start items-start space-y-1">
          <span className="text-lg font-semibold">Name of exam</span>
          <Input
            value={examInfo?.name}
            onChange={(e) => {
              setExamInfo((pre) => ({ ...pre, name: e.target.value }));
            }}
          />
        </div>
        <div className="flex flex-col justify-start items-start space-y-1">
          <span className="text-lg font-semibold">Time limit</span>
          <Input
            type="number"
            value={examInfo?.timeFinish}
            onChange={(e) => {
              setExamInfo((pre) => ({
                ...pre,
                timeFinish: Number(e.target.value),
              }));
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-start items-start space-y-1">
        <span className="text-lg font-semibold">Level exam</span>
        <Radio.Group
          value={examInfo.level}
          onChange={(e) => {
            setExamInfo((pre) => ({
              ...pre,
              level: e.target.value,
            }));
          }}
        >
          <Radio value={'N1'}>N1</Radio>
          <Radio value={'N2'}>N2</Radio>
          <Radio value={'N3'}>N3</Radio>
          <Radio value={'N4'}>N4</Radio>
          <Radio value={'N5'}>N5</Radio>
        </Radio.Group>
      </div>
      <div className="flex flex-col justify-start items-start space-y-1">
        <span className="text-lg font-semibold">Description</span>
        <TextArea
          value={examInfo.description}
          onChange={(e) => {
            setExamInfo((pre) => ({
              ...pre,
              description: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
}
