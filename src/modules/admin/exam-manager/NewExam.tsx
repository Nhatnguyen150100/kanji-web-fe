import { Input, Radio } from 'antd';
import React, { useState } from 'react';
import { IExamRequest } from '../../../types/exam.types';
import ExamDetailSection from './ExamDetailSection';

export default function NewExam() {
  const [examInfo, setExamInfo] = useState<IExamRequest>();

  return (
    <div className="flex w-full flex-col justify-center items-center space-y-5">
      <h1 className="font-bold text-3xl">Create new exam</h1>
      <ExamDetailSection />
    </div>
  );
}
