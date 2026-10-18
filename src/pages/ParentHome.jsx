import { useState } from 'react';
import Tabs from '../components/Tabs';
import ChildrenPage from './ChildrenPage';
import ManageTasksPage from './ManageTasksPage';
import RoundPage from './RoundPage';

const TABS = [
  { key: 'round', label: 'הסבב הנוכחי' },
  { key: 'tasks', label: 'ניהול משימות' },
  { key: 'children', label: 'הילדים' },
];

const PAGES = {
  round: <RoundPage />,
  tasks: <ManageTasksPage />,
  children: <ChildrenPage />,
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
