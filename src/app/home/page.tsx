'use client';

import ChallengeComponent from '@/components/challengeComponent';
import Navigation from '@/components/navigation';
import StatisticsComponent from '@/components/statisticsComponent';
import React, { FC, useState } from 'react';

const Home: FC = () => {
  const [activePage, setActivePage] = useState<string>('');

  // Function to handle page change based on navigation
  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="flex h-screen bg-white text-black p-4">
      <Navigation onNavigate={handlePageChange} />
      <div className="pl-4 flex-1">
        <StatisticsComponent />
      </div>
    </div>
  );
};

export default Home;
