import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IKanji, IQueryKanji } from '../../../../types/kanji.types';
import { kanjiService } from '../../../../services';
import { Empty, Pagination, Spin } from 'antd';
import BaseSearch from '../../../../components/base/BaseSearch';
import BaseDisplayKanji from '../../../../components/base/BaseDisplayKanji';
import { onChooseLevelKanji } from '../../../../utils/functions/on-choose-level-kanji';

type Props = {};

export default function LevelN5Page({}: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState<Partial<IQueryKanji>>({
    page: 1,
    limit: 5,
    nameLike: '',
    level: 'N5',
  });
  const [listKanji, setListKanji] = useState<IKanji[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetListKanji = async (queryParam = query) => {
    try {
      setLoading(true);
      const rs = await kanjiService.listKanji(queryParam);
      setListKanji(rs.data.content);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetListKanji();
  }, []);

  const handleClickKanji = (kanji: IKanji): void => {
    navigate(`/dashboard/list-kanjis/${kanji.id}`);
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className="flex flex-col justify-center space-y-10 w-full">
          <BaseSearch
            value={query.nameLike!}
            placeholder="Input search text"
            onHandleChange={(value) => {
              if (!value)
                handleGetListKanji({
                  page: query.page,
                  limit: query.limit,
                  level: 'N5',
                });
              setQuery({ ...query, nameLike: value });
            }}
            onSearch={() => handleGetListKanji()}
          />
          <div className="flex flex-row justify-start items-center">
            <span className="text-xl font-bold text-gray-800 me-3">Level:</span>
            {onChooseLevelKanji('N5')}
          </div>
          <div className="flex flex-row justify-center items-start space-x-4 flex-wrap min-h-[400px]">
            {listKanji.length === 0 && <Empty />}
            {listKanji?.map((item) => (
              <BaseDisplayKanji
                key={item.id}
                kanji={item}
                onClick={(kanji) => handleClickKanji(kanji)}
              />
            ))}
          </div>
          <div className="w-full">
            <Pagination
              align="center"
              total={query.total}
              pageSize={query.limit}
              current={query.page}
              onChange={(page) => {
                setQuery({
                  ...query,
                  page,
                });
                handleGetListKanji({
                  ...query,
                  page,
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
