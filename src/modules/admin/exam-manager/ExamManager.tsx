import React, { useEffect, useMemo, useState } from 'react';
import { IKanji, ILevelKanji, IQueryKanji } from '../../../types/kanji.types';
import { accountService, examService, kanjiService } from '../../../services';
import {
  Button,
  Modal,
  notification,
  Pagination,
  Spin,
  Table,
  TableProps,
} from 'antd';
import BaseSearch from '../../../components/base/BaseSearch';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { formatDate } from '../../../utils/functions/format-date';
import { IExam, IQueryExam } from '../../../types/exam.types';
import { onChooseLevelKanji } from '../../../utils/functions/on-choose-level-kanji';
import { useNavigate } from 'react-router-dom';
import DEFINE_ROUTERS from '../../../constants/routers-mapper';

export default function ExamManager() {
  const [query, setQuery] = useState<Partial<IQueryExam>>({
    page: 1,
    limit: 5,
    nameLike: '',
  });
  const [examList, setExamList] = useState<IExam[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteExam = (exam: IExam) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this exam?',
      content: `Exam: ${exam.name}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const rs = await examService.deleteExam(exam.id);
          notification.success({
            message: 'Success',
            description: rs.message,
          });
          handleGetExamList();
        } catch (error) {
          notification.error({
            message: 'Error',
            description: 'Failed to delete exam.',
          });
        }
      },
    });
  };

  const columns: TableProps<IExam>['columns'] = [
    {
      title: 'Index',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name of exam',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="text-xl font-semibold">{text}</span>,
    },
    {
      title: 'Level of exam',
      key: 'level',
      dataIndex: 'level',
      render: (level) => onChooseLevelKanji(level),
    },
    {
      title: 'Time finish',
      key: 'timeFinish',
      dataIndex: 'timeFinish',
      render: (text) => <span className="font-semibold">{text} minutes</span>,
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      render: (text) => <span className="font-normal">{text} minutes</span>,
    },
    {
      title: 'Created date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt) => <span>{formatDate(createdAt)}</span>,
    },
    {
      title: 'Delete exam',
      key: 'deleteExam',
      render: (_, exam: IExam) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteExam(exam);
          }}
          className="ms-3"
          variant="solid"
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const handleGetExamList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await examService.getExamList(queryParam);
      setExamList(rs.data.content);
      setQuery((pre) => ({
        ...pre,
        total: rs.data.totalCount,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetExamList();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center space-y-5">
      <h1 className="font-bold text-3xl">Exam Manager</h1>
      <div className="flex flex-row justify-between items-center w-full">
        <BaseSearch
          value={query.nameLike!}
          placeholder="Input search text"
          onHandleChange={(value) => {
            if (!value)
              handleGetExamList({
                page: query.page,
                limit: query.limit,
              });
            setQuery({ ...query, nameLike: value });
          }}
          onSearch={() => handleGetExamList()}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
          onClick={() => {
            navigate(DEFINE_ROUTERS.newExam)
          }}
        >
          Add new exam
        </Button>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <div className="w-full">
          <Table<IExam>
            rowKey="id"
            columns={columns}
            dataSource={examList}
            pagination={{
              current: query.page,
              pageSize: query.limit,
              total: query.total,
              onChange: (page, limit) => {
                setQuery((pre) => ({
                  ...pre,
                  page,
                  limit,
                }));
                handleGetExamList({
                  ...query,
                  page,
                  limit,
                });
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
