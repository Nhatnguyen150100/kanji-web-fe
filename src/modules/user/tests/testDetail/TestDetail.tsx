import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Visibility from '../../../../components/base/visibility';
import { examService } from '../../../../services';
import { IExamDetail } from '../../../../types/exam.types';
import { Empty, Spin } from 'antd';
import FormTest from './FormTest';

type Props = {}

export default function TestDetail({}: Props) {
  const { testsId } = useParams<{ testsId: string }>();
  const [exam, setExam] = useState<IExamDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetExamDetail = async () => {
    if (!testsId) return;
    try {
      setLoading(true);
      const rs = await examService.getDetailExam(testsId);
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
      <FormTest examProps={exam!} />
    </Visibility>
  )
}