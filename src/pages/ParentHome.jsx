import { useState } from 'react';
import Tabs from '../components/Tabs';
import ManageTasksPage from './ManageTasksPage';
import RoundPage from './RoundPage';

const TABS = [
  { key: 'round', label: 'הסבב הנוכחי' },
  { key: 'tasks', label: 'ניהול משימות' },
];

export default function ParentHome() {
  const [tab, setTab] = useState('round');

  return (
    <>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === 'round' ? <RoundPage /> : <ManageTasksPage />}
    </>
  );
}
