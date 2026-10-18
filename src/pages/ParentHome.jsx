import { useState } from 'react';
import Tabs from '../components/Tabs';
import ChatPage from './ChatPage';
import ChildrenPage from './ChildrenPage';
import ManageTasksPage from './ManageTasksPage';
import RoundPage from './RoundPage';
import SwapsPage from './SwapsPage';

const TABS = [
  { key: 'round', label: 'הסבב הנוכחי' },
  { key: 'tasks', label: 'ניהול משימות' },
  { key: 'children', label: 'הילדים' },
  { key: 'swaps', label: 'החלפות' },
  { key: 'chat', label: "צ'אט" },
];

const PAGES = {
  round: <RoundPage />,
  tasks: <ManageTasksPage />,
  children: <ChildrenPage />,
  swaps: <SwapsPage />,
  chat: <ChatPage />,
};

export default function ParentHome() {
  const [tab, setTab] = useState('round');

  return (
    <>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {PAGES[tab]}
    </>
  );
}
