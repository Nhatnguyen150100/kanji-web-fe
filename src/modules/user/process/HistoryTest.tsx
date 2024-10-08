import { useEffect, useState } from 'react';
import { ILevelKanji } from '../../../types/kanji.types';
import { testService } from '../../../services';
import { Spin, Table, TableProps } from 'antd';
import { formatDate } from '../../../utils/functions/format-date';
import { IQueryExam } from '../../../types/exam.types';
import { onChooseLevelKanji } from '../../../utils/functions/on-choose-level-kanji';
import { useNavigate } from 'react-router-dom';
import { ITest } from '../../../types/test.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';

export default function HistoryTest() {
  const user = useSelector((state: RootState) => state.user);
  const [query, setQuery] = useState<Partial<IQueryExam>>({
    page: 1,
    limit: 5,
  });
  const [testList, setTestList] = useState<ITest[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: TableProps<ITest>['columns'] = [
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
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      render: (text) => <span className="font-normal">{text} minutes</span>,
    },
    {
      title: 'Score of exam',
      key: 'score',
      dataIndex: 'score',
      render: (score) => (
        <span className="text-xl font-semibold text-green-600">{score}</span>
      ),
    },
    {
      title: 'Created date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt) => <span>{formatDate(createdAt)}</span>,
    },
  ];

  const handleGetTestList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await testService.getAllScoreTest(user.id, queryParam);
      setTestList(rs.data.content);
      setQuery((pre) => ({
        ...pre,
        total: rs.data.totalCount,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTestList();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center space-y-5 w-full">
      <h1 className="font-bold text-3xl">List of completed tests</h1>
      {loading ? (
        <Spin />
      ) : (
        <div className="w-full">
          <Table<ITest>
            rowKey="id"
            dataSource={testList}
            columns={columns}
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
                handleGetTestList({
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
