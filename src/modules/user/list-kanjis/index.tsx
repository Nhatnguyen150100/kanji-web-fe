import React, { useEffect, useState } from 'react';
import { kanjiService } from '../../../services';
import { IKanji, IQueryKanji } from '../../../types/kanji.types';
import { Spin } from 'antd';
import BaseDisplayKanji from '../../../components/base/BaseDisplayKanji';
import _ from 'lodash';
import BaseSearch from '../../../components/base/BaseSearch';
import { useNavigate } from 'react-router-dom';
import DEFINE_ROUTERS from '../../../constants/routers-mapper';

type Props = {};

export default function ListKanjis({}: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState<Partial<IQueryKanji>>({
    page: 1,
    limit: 5,
    nameLike: '',
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
                });
              setQuery({ ...query, nameLike: value });
            }}
            onSearch={handleGetListKanji}
          />
          <div className="flex flex-row justify-center items-start space-x-4 flex-wrap min-h-[400px]">
            {listKanji?.map((item) => (
              <BaseDisplayKanji
                key={item.id}
                kanji={item}
                onClick={(kanji) => handleClickKanji(kanji)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
