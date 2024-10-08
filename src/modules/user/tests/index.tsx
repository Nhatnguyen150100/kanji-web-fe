import React, { useEffect, useMemo, useState } from 'react';
import { IKanji, ILevelKanji, IQueryKanji } from '../../../types/kanji.types';
import { accountService, examService, kanjiService } from '../../../services';
import {
  Button,
  Modal,
  notification,
  Pagination,
  Radio,
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
import Visibility from '../../../components/base/visibility';

export default function TestsPage() {
  const [query, setQuery] = useState<Partial<IQueryExam>>({
    page: 1,
    limit: 5,
    nameLike: '',
  });
  const [examList, setExamList] = useState<IExam[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleClickRow = (exam: IExam) => {
    navigate(`/dashboard/tests/${exam.id}`);
  };

  const onChangeFilterLevel = (level: ILevelKanji) => {
    setQuery((pre) => ({
      ...pre,
      level,
    }));
    handleGetExamList({ ...query, level, page: 1 });
  };

  useEffect(() => {
    handleGetExamList();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center space-y-5 w-full">
      <h1 className="font-bold text-3xl">List test</h1>
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
        <div className="flex flex-row justify-between">
          <Radio.Group
            value={query.level}
            onChange={(e) => {
              onChangeFilterLevel(e.target.value);
            }}
          >
            <Radio.Button value="N1">{onChooseLevelKanji('N1')}</Radio.Button>
            <Radio.Button value="N2">{onChooseLevelKanji('N2')}</Radio.Button>
            <Radio.Button value="N3">{onChooseLevelKanji('N3')}</Radio.Button>
            <Radio.Button value="N4">{onChooseLevelKanji('N4')}</Radio.Button>
            <Radio.Button value="N5">{onChooseLevelKanji('N5')}</Radio.Button>
          </Radio.Group>
          <Visibility visibility={Boolean(query.level)}>
            <Button
              className="ms-3"
              variant="solid"
              color="danger"
              shape="default"
              onClick={() => {
                setQuery((pre) => ({
                  ...pre,
                  level: undefined,
                }));
                handleGetExamList({ ...query, level: undefined, page: 1 });
              }}
              icon={<DeleteOutlined />}
            />
          </Visibility>
        </div>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <div className="w-full">
          <Table<IExam>
            rowKey="id"
            columns={columns}
            dataSource={examList}
            onRow={(record) => ({
              onClick: () => handleClickRow(record),
            })}
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
