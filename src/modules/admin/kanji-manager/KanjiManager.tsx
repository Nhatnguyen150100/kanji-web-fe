import React, { useEffect, useMemo, useState } from 'react';
import { IKanji, ILevelKanji, IQueryKanji } from '../../../types/kanji.types';
import { kanjiService } from '../../../services';
import { Button, Modal, Pagination, Spin, Table, TableProps } from 'antd';
import { onChooseLevelKanji } from '../../../utils/functions/on-choose-level-kanji';
import BaseSearch from '../../../components/base/BaseSearch';
import { PlusOutlined } from '@ant-design/icons';
import { formatDate } from '../../../utils/functions/format-date';
import KanjiForm from './KanjiForm';

const columns: TableProps<IKanji>['columns'] = [
  {
    title: 'Character',
    dataIndex: 'character',
    key: 'character',
    render: (text) => <span className="text-2xl font-semibold">{text}</span>,
  },
  {
    title: 'Level',
    key: 'level',
    dataIndex: 'level',
    render: (level) => onChooseLevelKanji(level),
  },
  {
    title: 'Meaning',
    key: 'meaning',
    dataIndex: 'meaning',
  },
  {
    title: 'Created at',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (createdAt) => <span>{formatDate(createdAt)}</span>,
  },
];

export default function KanjiManager() {
  const [query, setQuery] = useState<Partial<IQueryKanji>>({
    page: 1,
    limit: 10,
    nameLike: '',
  });
  const [listKanji, setListKanji] = useState<IKanji[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateKanji, setUpdateKanji] = useState<IKanji>();

  const handleGetListKanji = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await kanjiService.listKanji(queryParam);
      setListKanji(rs.data.content);
      setQuery((pre) => ({
        ...pre,
        total: rs.data.totalCount,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetListKanji();
  }, []);

  const handleClickRow = (kanji: IKanji) => {
    setUpdateKanji(kanji);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setUpdateKanji(undefined);
    setModalVisible(false);
  };

  const handleOk = () => {
    handleCancel();
    handleGetListKanji();
  };

  return (
    <div className="flex flex-col justify-start items-center space-y-5">
      <h1 className="font-bold text-3xl">KanJi Manager</h1>
      <div className="flex flex-row justify-between items-center w-full">
        <BaseSearch
          value={query.nameLike!}
          placeholder="Input search text"
          onHandleChange={(value) => {
            if (!value)
              handleGetListKanji({
                page: query.page,
                limit: query.limit,
              });
            setQuery({ ...query, nameLike: value });
          }}
          onSearch={handleGetListKanji}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Add new kanji
        </Button>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <div className="w-full">
          <Table<IKanji>
            rowKey="id"
            columns={columns}
            dataSource={listKanji}
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
                handleGetListKanji({
                  ...query,
                  page,
                  limit,
                });
              },
            }}
          />
          {modalVisible && (
            <KanjiForm
              kanji={updateKanji}
              modalVisible={modalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          )}
        </div>
      )}
    </div>
  );
}
