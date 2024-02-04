import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import GPTTab from './GPTTab';
import ScribeTab from './ScribeTab';
import { MessageFilled, RobotFilled } from '@ant-design/icons';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'SCRIBE',
    children: <ScribeTab />,
    icon: <MessageFilled />,
  },
  //   {
  //     key: '2',
  //     label: 'CO-STAR',
  //     children: 'Content of Tab Pane 2',
  //   },
  {
    key: '3',
    label: 'GPT',
    children: <GPTTab />,
    icon: <RobotFilled />,
  },
];

const App: React.FC = () => (
  <Tabs defaultActiveKey="1" type="card" items={items} onChange={onChange} />
);

export default App;
