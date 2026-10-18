import { useCallback, useEffect, useState } from 'react';
import { getMyProfile } from '../api/assignmentsApi';
import AvailableTasksPage from './AvailableTasksPage';
import MyTasksPage from './MyTasksPage';

const TABS = { available: 'משימות פנויות', mine: 'המשימות שלי' };

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
      <div className="tabs" role="tablist">
        {Object.entries(TABS).map(([key, label]) => (
          <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'available' ? <AvailableTasksPage /> : <MyTasksPage onPointsChanged={refreshPoints} />}
    </>
  );
}
