import React, { useEffect, useRef, useState } from 'react';
import { ILoginLog } from '../../../types/login-log.types';
import { loginLogService } from '../../../services';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Spin } from 'antd';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function DashBoard() {
  const [listLog, setListLog] = useState<ILoginLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chartRef = useRef();

  const onGetLoginLog = async () => {
    try {
      setLoading(true);
      const rs = await loginLogService.getListLog();
      setListLog(rs.data);
    } finally {
      setLoading(false);
    }
  };

  const chartData = React.useMemo(() => {
    return {
      labels: listLog.map((item) => item.loginDate),
      datasets: [
        {
          label: 'Số lượng đăng nhập',
          data: listLog.map((item) => item.loginCount),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [listLog]);
  console.log('🚀 ~ chartData ~ chartData:', chartData);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    onGetLoginLog();
  }, []);

  useEffect(() => {
    const chartInstance: any = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [listLog]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="font-bold text-3xl">Dashboard Manager</h1>
      {loading ? <Spin /> : <Bar ref={chartRef} data={chartData} options={options} />}
      {/* <Bar data={chartData} options={options} /> */}
    </div>
  );
}
