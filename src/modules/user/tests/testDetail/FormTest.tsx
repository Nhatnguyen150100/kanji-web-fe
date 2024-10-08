import { useMemo, useState } from 'react';
import { Button, Modal, Radio } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  IExamDetail,
  IQuestion,
} from '../../../../types/exam.types';
import { onChooseLevelKanji } from '../../../../utils/functions/on-choose-level-kanji';
import { ILevelKanji } from '../../../../types/kanji.types';
import Visibility from '../../../../components/base/visibility';
import CountdownTimer from '../../../../components/base/CountDownTimer';
import { calculateScore } from '../../../../utils/functions/on-calculate-score';
import { testService } from '../../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../lib/store';
import { toast } from 'react-toastify';
import GeneralLoading from '../../../../components/base/GeneralLoading';

interface IProps {
  examProps: IExamDetail;
}

interface IAnswer {
  id: string;
  answer: string;
}

const STARTED_QUESTION_DEFAULT = 1;

export default function FormTest({ examProps }: IProps) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const listQuestions = useMemo(() => {
    return (
      examProps?.questions.map(
        (q): IQuestion => ({
          ...q,
          options: q.options,
        }),
      ) ?? []
    );
  }, [examProps]);

  const [listAnswer, setListAnswer] = useState<IAnswer[]>([]);
  const [isStartTest, setIsStartTest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>();

  const handleAddOrEditAnswer = (id: string, answer: string) => {
    setListAnswer([
      ...listAnswer?.filter((item) => item.id !== id),
      { id, answer },
    ]);
  };

  const [currentOrder, setCurrentOrder] = useState<number>(
    STARTED_QUESTION_DEFAULT,
  );

  const currentQuestion = useMemo((): IQuestion | null => {
    if (!listQuestions.length) return null;
    return (
      listQuestions?.find((question) => question.order === currentOrder) ?? null
    );
  }, [listQuestions, currentOrder]);

  const maxOrderQuestion = useMemo(() => {
    return Math.max(...listQuestions.map((q) => q.order));
  }, [listQuestions]);

  const handleCalculateScore = (): number => {
    const totalCorrectAnswer = listQuestions
      .map((question) => {
        const answer = listAnswer.find((answer) => answer.id === question.id);
        if (answer?.answer === question.correctAnswer) return question;
      })
      .filter((answer) => answer?.id);
    return totalCorrectAnswer.length;
  };

  const handleOk = async () => {
    const score = handleCalculateScore();
    try {
      setLoading(true);
      const rs = await testService.saveScore({
        idUser: user.id,
        idExam: examProps.id,
        score,
      })
      setCurrentOrder(STARTED_QUESTION_DEFAULT);
      setIsStartTest(false);
      setScore(score);
      toast.success(rs.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    Modal.confirm({
      title: 'Are you sure you want to submit test',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      style: {
        top: '50%',
        transform: 'translateY(-50%)',
      },
      onOk: () => {
        handleOk();
      },
    });
  };

  const handleCountdownComplete = () => {
    handleOk();
  };

  return (
    <div className="w-full space-y-5">
      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col justify-start items-start space-y-1">
            <span className="text-lg font-semibold">Name of exam</span>
            <span className="text-md">{examProps?.name}</span>
          </div>
          <div className="flex flex-col justify-start items-start space-y-1">
            <span className="text-lg font-semibold">Level exam</span>
            {onChooseLevelKanji(examProps.level as ILevelKanji)}
          </div>
          <div className="flex flex-col justify-start items-start space-y-1">
            <span className="text-lg font-semibold">Description</span>
            <pre className="text-md">{examProps.description}</pre>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start space-y-1">
          <span className="text-lg font-semibold">Time limit (minutes)</span>
          <CountdownTimer
            isShowStartTest={score === undefined}
            isActive={isStartTest}
            onStart={(value) => {
              setIsStartTest(value);
            }}
            initialMinutes={examProps.timeFinish}
            onCountdownComplete={handleCountdownComplete}
          />
        </div>
      </div>
      <Visibility visibility={score !== undefined}>
        <div className="flex flex-row justify-center items-center space-x-2 w-full p-4 bg-green-800 rounded-2xl">
          <span className="font-semibold text-2xl text-white">Score:</span>
          <span className="font-semibold text-2xl text-white">{`${calculateScore(
            score!,
            listQuestions.length,
          )}  (${score}/${listQuestions.length} question)`}</span>
        </div>
      </Visibility>
      {currentQuestion && (isStartTest || score !== undefined) && (
        <div className="shadow-md rounded-2xl py-4 px-8 flex flex-col justify-start items-start bg-gray-200 space-y-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">
              Question {currentQuestion.order}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start space-y-1 w-full">
            <span className="text-md">{currentQuestion.content}</span>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 w-full">
            <span className="text-lg font-semibold">Answer</span>
            <Visibility visibility={currentQuestion.options.length > 0}>
              <Radio.Group
                className="flex flex-col justify-start items-start space-y-3"
                value={
                  listAnswer?.find((answer) => answer.id === currentQuestion.id)
                    ?.answer
                }
                onChange={(e) => {
                  if (score !== undefined) return;
                  handleAddOrEditAnswer(currentQuestion.id, e.target.value);
                }}
              >
                {currentQuestion.options.map((option) => {
                  return (
                    <div className="flex flex-row justify-start items-center space-x-5">
                      <Radio key={option} value={option}>
                        {option}
                      </Radio>
                      <Visibility visibility={score !== undefined}>
                        <span
                          className={`text-[20px] ${
                            option === currentQuestion.correctAnswer
                              ? 'text-green-500'
                              : 'text-red-500'
                          }  mb-2`}
                        >
                          <Visibility
                            visibility={
                              option === currentQuestion.correctAnswer
                            }
                            suspenseComponent={<CloseOutlined />}
                          >
                            <CheckOutlined />
                          </Visibility>
                        </span>
                      </Visibility>
                    </div>
                  );
                })}
              </Radio.Group>
            </Visibility>
          </div>
        </div>
      )}
      <Visibility
        visibility={
          (currentOrder > STARTED_QUESTION_DEFAULT ||
            currentOrder < maxOrderQuestion) &&
          (isStartTest || score !== undefined)
        }
      >
        <div className="w-full flex justify-between items-center">
          <Visibility
            visibility={currentOrder > STARTED_QUESTION_DEFAULT}
            boundaryComponent
          >
            <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              iconPosition="start"
              onClick={() => {
                setCurrentOrder(currentOrder - 1);
              }}
            >
              Previous question
            </Button>
          </Visibility>
          <Visibility
            visibility={currentOrder < maxOrderQuestion}
            boundaryComponent
          >
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={() => {
                setCurrentOrder(currentOrder + 1);
              }}
            >
              Next question
            </Button>
          </Visibility>
        </div>
      </Visibility>
      <div className="flex flex-row w-full space-x-5">
        <Button
          type="default"
          color="default"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Visibility visibility={isStartTest}>
          <Button type="primary" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Visibility>
      </div>
      <GeneralLoading isLoading={loading} />
    </div>
  );
}
