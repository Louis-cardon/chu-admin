'use client';

import AnnouncementsComponent from '@/components/announcementsComponent';
import ChallengeComponent from '@/components/challengeComponent';
import Navigation from '@/components/navigation';
import StatisticsComponent from '@/components/statisticsComponent';
import { FC } from 'react';
import { useState } from 'react';

const Home: FC = () => {
  const [activeChallengeId, setActiveChallengeId] = useState<number>(0);
  const [activeSubMenu, setActiveSubMenu] = useState<string>('');

  const handleChallengeClick = (challengeId: number) => {
    setActiveChallengeId(challengeId);
  };

  const handleSubMenuClick = (subMenu: string) => {
    setActiveSubMenu(subMenu);
  };

  return (
    <div className="flex h-screen bg-white text-black p-4">
      <Navigation
        onNavigate={handleChallengeClick}
        onSubMenuClick={handleSubMenuClick}
      />
      <div className="pl-4 flex-1">
        {activeSubMenu === 'announcements' && (
          <AnnouncementsComponent challengeId={activeChallengeId} />
        )}
        {activeSubMenu === 'statistics' && (
          <StatisticsComponent challengeId={activeChallengeId} />
        )}
        {activeSubMenu === 'challenge' && (
          <ChallengeComponent challengeId={activeChallengeId} />
        )}
      </div>
    </div>
  );
};

export default Home;
