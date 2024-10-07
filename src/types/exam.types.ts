import { ILevelKanji } from './kanji.types';

export interface IExam {
  id: string;
  name: string;
  timeFinish: number;
  level: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExamDetail {
  id: string;
  name: string;
  timeFinish: number;
  level: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: string;
  content: string;
  options: string[];
  correctAnswer: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQueryExam {
  page: number;
  limit: number;
  total: number;
  nameLike: string;
  level: ILevelKanji;
}

export type TExamInfo = Pick<
  IExam,
  'name' | 'level' | 'timeFinish' | 'description'
>;


export interface IExamRequest {
  name: string;
  timeFinish: number;
  level: string;
  description: string;
  questions: IQuestionRequest[];
}

export interface IQuestionRequest {
  content: string;
  order: number;
  options: IOptionsLocal[];
  correctAnswer: string;
}

export interface IOptionsLocal {
  id: number,
  option: string,
}