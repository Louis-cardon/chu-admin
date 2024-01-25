"use client";

import Navigation from '@/components/navigation';
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
      <div className="flex-1 p-4">
        {/* Here you would render the content based on activePage */}
        <h1>{activePage || 'Welcome'}</h1>
        {/* Replace above line with your page content */}
      </div>
    </div>
  );
};

export default Home;
