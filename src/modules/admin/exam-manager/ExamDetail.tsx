import React, { useEffect, useState } from 'react';
import { IExamDetail } from '../../../types/exam.types';
import { useParams } from 'react-router-dom';
import { examService } from '../../../services';
import Visibility from '../../../components/base/visibility';
import { Empty, Spin } from 'antd';
import ExamDetailSection from './ExamDetailSection';

export default function ExamDetail() {
  const { examId } = useParams<{ examId: string }>();
  const [exam, setExam] = useState<IExamDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetExamDetail = async () => {
    if (!examId) return;
    try {
      setLoading(true);
      const rs = await examService.getDetailExam(examId);
      setExam(rs.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetExamDetail();
  }, []);

  return (
    <Visibility
      visibility={Boolean(exam?.id)}
      suspenseComponent={loading ? <Spin /> : <Empty />}
    >
      <ExamDetailSection examProps={exam} />
    </Visibility>
  );
}
