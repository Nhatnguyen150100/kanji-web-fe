import { Tabs, TabsProps } from 'antd';
import HistoryTest from './HistoryTest';
import ProcessTest from './ProcessTest';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'History of list completed test',
    children: <HistoryTest />,
  },
  {
    key: '2',
    label: 'Learn progress',
    children: <ProcessTest />,
  },
];

export default function ProcessPage() {
  return (
    <div className="w-full">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
