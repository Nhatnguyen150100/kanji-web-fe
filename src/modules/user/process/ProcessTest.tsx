import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { IProcess } from '../../../types/test.types';
import { testService } from '../../../services';
import { Progress, Spin } from 'antd';
import { onChooseLevelKanji } from '../../../utils/functions/on-choose-level-kanji';
import { ILevelKanji } from '../../../types/kanji.types';

type Props = {};

export default function ProcessTest({}: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [processList, setProcessList] = useState<IProcess[]>([]);
  console.log("🚀 ~ ProcessTest ~ processList:", processList)
  const [loading, setLoading] = useState(false);

  const handleGetProcess = async () => {
    try {
      setLoading(true);
      const rs = await testService.getProcess(user.id);
      setProcessList(rs.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProcess();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center space-y-5 w-full">
      <h1 className="font-bold text-3xl">Process of completed tests</h1>
      {loading ? (
        <Spin />
      ) : (
        <div className="flex flex-col justify-start w-full items-center space-y-5">
          {processList?.map((process) => (
            <div className='flex flex-col justify-start items-start space-y-3 w-full'>
              <span className='text-xl font-semibold'>Level: {onChooseLevelKanji(process.level as ILevelKanji )}</span>
              <Progress
                type='line'
                key={process.level}
                size={['100%', 20]}
                format={(percent) => `${percent ? parseFloat(percent!.toFixed(1)) : 0}%`}
                percent={(process.count / process.total * 100)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
