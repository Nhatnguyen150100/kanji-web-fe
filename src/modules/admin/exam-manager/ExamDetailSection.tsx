import React, { useMemo, useState } from 'react';
import {
  IExamDetail,
  IQuestionRequest,
  TExamInfo,
} from '../../../types/exam.types';
import { Button, Input, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

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
  const [listQuestions, setListQuestions] = useState<IQuestionRequest[]>(
    examProps?.questions.map(
      (q): IQuestionRequest => ({
        ...q,
        options: q.options.map((option, index) => ({
          id: index,
          option: option,
        })),
      }),
    ) ?? [],
  );
  const [currentOrder, setCurrentOrder] = useState<number>(0);

  const currentQuestion = useMemo(() => {
    if (!listQuestions.length) return null;
    return listQuestions?.find((question) => question.order === currentOrder);
  }, [listQuestions, currentOrder]);

  const handleAddNewQuestion = () => {
    const newQuestion: IQuestionRequest = {
      order: listQuestions.length + 1,
      content: '',
      options: [],
      correctAnswer: '',
    };
    setListQuestions([...listQuestions, newQuestion]);
    setCurrentOrder(newQuestion.order);
  };

  return (
    <div className="w-full space-y-5">
      <div className="grid grid-cols-5 gap-x-8 gap-y-3">
        <div className="col-span-3 flex flex-col justify-start items-start space-y-1">
          <span className="text-lg font-semibold">Name of exam</span>
          <Input
            size="large"
            value={examInfo?.name}
            onChange={(e) => {
              setExamInfo((pre) => ({ ...pre, name: e.target.value }));
            }}
          />
        </div>
        <div className="flex flex-col justify-start items-start space-y-1">
          <span className="text-lg font-semibold">Time limit (minutes)</span>
          <Input
            size="large"
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
        <div className="col-span-3 flex flex-col justify-start items-start space-y-1">
          <span className="text-lg font-semibold">Description</span>
          <TextArea
            size="large"
            value={examInfo.description}
            onChange={(e) => {
              setExamInfo((pre) => ({
                ...pre,
                description: e.target.value,
              }));
            }}
          />
        </div>
        <div className="col-span-2 flex flex-col justify-start items-start space-y-1">
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
      </div>
      {currentQuestion && (
        <div className="shadow-md rounded-2xl py-4 px-8 flex flex-col justify-start items-start bg-gray-200 space-y-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">
              Question {currentQuestion.order}
            </span>
            <Button
              className="ms-3"
              variant="solid"
              color="danger"
              shape="default"
              icon={<DeleteOutlined />}
            />
          </div>
          <div className="flex flex-col justify-start items-start space-y-1 w-full">
            <span className="text-lg font-semibold">Content of exam</span>
            <Input
              size="large"
              value={examInfo?.name}
              onChange={(e) => {
                setExamInfo((pre) => ({ ...pre, name: e.target.value }));
              }}
            />
          </div>
          <div className="flex flex-col justify-start items-start space-y-1 w-full">
            <span className="text-lg font-semibold">Option answer</span>
            <Button type="primary" icon={<PlusOutlined />} iconPosition="start">
              Add new option answer
            </Button>
          </div>
        </div>
      )}
      {}
      <div className="w-full flex justify-between items-center">
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          iconPosition="start"
          onClick={handleAddNewQuestion}
        >
          Previous question
        </Button>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={handleAddNewQuestion}
        >
          Next question
        </Button>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        iconPosition="start"
        onClick={handleAddNewQuestion}
      >
        Add new question
      </Button>
      <div className="flex flex-row w-full space-x-5">
        <Button type="default" color="default">
          Cancel
        </Button>
        <Button type="primary" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}
