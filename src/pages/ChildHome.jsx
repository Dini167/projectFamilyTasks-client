import { useCallback, useEffect, useState } from 'react';
import { getMyProfile } from '../api/assignmentsApi';
import Tabs from '../components/Tabs';
import AvailableTasksPage from './AvailableTasksPage';
import ChatPage from './ChatPage';
import MyTasksPage from './MyTasksPage';
import SwapsPage from './SwapsPage';

const TABS = [
  { key: 'available', label: 'משימות פנויות' },
  { key: 'mine', label: 'המשימות שלי' },
  { key: 'swaps', label: 'החלפות' },
  { key: 'chat', label: "צ'אט" },
];

export default function ChildHome() {
  const [tab, setTab] = useState('available');
  const [profile, setProfile] = useState(null);

  const refreshProfile = useCallback(() => {
    getMyProfile().then(setProfile);
  }, []);

  useEffect(refreshProfile, [refreshProfile]);

  return (
    <>
      <p className="balance">
        <span>מאזן הנקודות שלי</span>
        <strong>★ {profile?.pointsBalance ?? '...'}</strong>
      </p>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === 'available' && <AvailableTasksPage />}
      {tab === 'mine' && <MyTasksPage onPointsChanged={refreshProfile} />}
      {tab === 'swaps' && profile && <SwapsPage childId={profile.id} />}
      {tab === 'chat' && <ChatPage />}
    </>
  );
}
