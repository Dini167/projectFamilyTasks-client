import { useCallback, useEffect, useState } from 'react';
import { getMyProfile } from '../api/assignmentsApi';
import PendingApprovalNotice from '../components/PendingApprovalNotice';
import Tabs from '../components/Tabs';
import AvailableTasksPage from './AvailableTasksPage';
import ChatPage from './ChatPage';
import MyTasksPage from './MyTasksPage';
import SwapsPage from './SwapsPage';

const POLL_MS = 10000;
const BIG_UI_MAX_AGE = 10;
const PENDING_TABS = [{ key: 'chat', label: "צ'אט" }];
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

  const pending = profile?.isApproved === false;

  useEffect(() => {
    if (!pending) return undefined;
    const timer = setInterval(refreshProfile, POLL_MS);
    return () => clearInterval(timer);
  }, [pending, refreshProfile]);

  const activeTab = pending ? 'chat' : tab;

  return (
    <>
      <p className="balance">
        <span>מאזן הנקודות שלי</span>
        <strong>★ {profile?.pointsBalance ?? '...'}</strong>
      </p>
      {pending && <PendingApprovalNotice />}
      <Tabs tabs={pending ? PENDING_TABS : TABS} active={activeTab} onChange={setTab} />
      {activeTab === 'available' && <AvailableTasksPage />}
      {activeTab === 'mine' && <MyTasksPage onPointsChanged={refreshProfile} big={profile?.age < BIG_UI_MAX_AGE} />}
      {activeTab === 'swaps' && profile && <SwapsPage childId={profile.id} />}
      {activeTab === 'chat' && <ChatPage />}
    </>
  );
}
