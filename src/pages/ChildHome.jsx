import { useCallback, useEffect, useState } from 'react';
import { getMyProfile } from '../api/assignmentsApi';
import Tabs from '../components/Tabs';
import AvailableTasksPage from './AvailableTasksPage';
import MyTasksPage from './MyTasksPage';

const TABS = [
  { key: 'available', label: 'משימות פנויות' },
  { key: 'mine', label: 'המשימות שלי' },
];

export default function ChildHome() {
  const [tab, setTab] = useState('available');
  const [points, setPoints] = useState(null);

  const refreshPoints = useCallback(() => {
    getMyProfile().then((profile) => setPoints(profile.pointsBalance));
  }, []);

  useEffect(refreshPoints, [refreshPoints]);

  return (
    <>
      <p className="balance">
        <span>מאזן הנקודות שלי</span>
        <strong>★ {points ?? '...'}</strong>
      </p>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === 'available' ? <AvailableTasksPage /> : <MyTasksPage onPointsChanged={refreshPoints} />}
    </>
  );
}
