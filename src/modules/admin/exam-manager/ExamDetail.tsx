import React, { useState } from 'react'
import { IExamDetail } from '../../../types/exam.types'
import { useParams } from 'react-router-dom';

export default function ExamDetail() {
  const { examId } = useParams<{ examId: string }>();
  const [exam, setExam] = useState<IExamDetail>();
  
  return (
    <div>ExamDetail</div>
  )
}