import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IKanji } from '../../../../types/kanji.types';
import { kanjiService } from '../../../../services';
import { Breadcrumb, Divider, Spin, Tag } from 'antd';
import { onChooseLevelKanji } from '../../../../utils/functions/on-choose-level-kanji';
import DEFINE_ROUTERS from '../../../../constants/routers-mapper';

export default function KanjiDetail() {
  const { kanjiId } = useParams<{ kanjiId: string }>();
  const [kanji, setKanji] = useState<IKanji>();
  const [loading, setLoading] = useState(false);

  const handleGetListKanji = async () => {
    try {
      setLoading(true);
      const rs = await kanjiService.getDetailKanji(kanjiId!);
      setKanji(rs.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (kanjiId) handleGetListKanji();
  }, [kanjiId]);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Breadcrumb
            className="mb-10"
            items={[
              {
                title: (
                  <a className="text-lg" href={DEFINE_ROUTERS.listKanjis}>
                    Kanji
                  </a>
                ),
              },
              {
                title: (
                  <a href="#" className="text-lg">
                    {kanji?.character} - {kanji?.level}
                  </a>
                ),
              },
            ]}
          />
          <div className="flex flex-col justify-start items-start border-[2px] border-gray-300 border-dashed shadow-xl p-8 space-y-4 w-full rounded-lg">
            <div className="flex flex-row justify-center items-center w-full mb-5">
              <span className="ms-4 text-9xl">{kanji?.character}</span>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-3 ">
                <div className="flex flex-row justify-start items-start">
                  <span className="text-xl font-bold text-gray-800">
                    Meaning:
                  </span>
                  <span className="text-xl ms-3">{kanji?.meaning}</span>
                </div>
                <div className="flex flex-row justify-start items-start">
                  <span className="text-xl font-bold text-gray-800">
                    Kanji radicals:
                  </span>
                  <span className="text-xl ms-3">{kanji?.chinaMeaning}</span>
                </div>
                <div className="flex flex-row justify-start items-start">
                  <span className="text-xl font-bold text-gray-800">
                    Onyomi:
                  </span>
                  <span className="text-xl ms-3">{kanji?.onReading}</span>
                </div>
                <div className="flex flex-row justify-start items-start">
                  <span className="text-xl font-bold text-gray-800">
                    Kunyomi:
                  </span>
                  <span className="text-xl ms-3">{kanji?.kunReading}</span>
                </div>
                <div className="flex flex-row justify-start items-start">
                  <span className="text-xl font-bold text-gray-800">
                    Mnemonic:
                  </span>
                  <span className="text-xl ms-3">{kanji?.mnemonic}</span>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start space-y-3">
                <div className="flex flex-row justify-start items-start">
                  <span className="text-xl font-bold text-gray-800">
                    Level:
                  </span>
                  {onChooseLevelKanji(kanji?.level)}
                </div>
                <span className="text-xl font-bold text-gray-800">
                  Example:
                </span>
                <ul className="divide-y divide-gray-200 list-disc ps-3 space-y-3 pt-3">
                  {kanji?.exampleKanjis?.map((example) => (
                    <li key={example.id} className="text-xl ms-3">
                      {example.example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
