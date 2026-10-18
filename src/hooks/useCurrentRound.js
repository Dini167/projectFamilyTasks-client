import { useEffect, useState } from 'react';
import { getCurrentRound, getRoundSummary } from '../api/roundsApi';

const NO_ROUND = { summary: null, roundId: null, freeAssignments: new Map() };

const fetchRound = async () => {
  try {
    const current = await getCurrentRound();
    const summary = await getRoundSummary(current.id);
    const free = summary.unassignedTasks.map((assignment) => [assignment.houseTaskId, assignment.id]);
    return { summary, roundId: current.id, freeAssignments: new Map(free) };
  } catch {
    return NO_ROUND;
  }
};

export default function useCurrentRound() {
  const [round, setRound] = useState(NO_ROUND);
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetchRound().then((result) => {
      if (ignore) return;
      setRound(result);
      setLoaded(true);
    });
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const refresh = () => setReloadKey((key) => key + 1);

  return { ...round, loaded, refresh };
}
