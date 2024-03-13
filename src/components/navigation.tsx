import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, FC } from 'react';
import Image from 'next/image';
import logoChu from '@/../public/assets/logo-CHU.png';
import { Challenge } from '@/types/challenge';
import { fetchAllChallenges } from '@/utils/supabase/fetchData';

interface NavigationProps {
  onNavigate: (challengeId: number) => void;
  onSubMenuClick: (subMenu: string) => void;
}

const Navigation: FC<NavigationProps> = ({ onNavigate, onSubMenuClick }) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [activeSubMenu, setActiveSubMenu] = useState<string>('');
  const [challenges, setChallenges] = useState<Challenge[] | null>(null);

  const handleItemClick = (challengeId: number) => {
    onNavigate(challengeId);
    setActiveItem(challengeId);
    handleSubMenuClick('announcements');
  };

  const handleSubMenuClick = (subMenu: string) => {
    setActiveSubMenu(subMenu);
    onSubMenuClick(subMenu);
  };

  const handleNewChallengeClick = () => {
    onSubMenuClick('announcements');
  };

  const buttonStyle = 'p-1 block border-l';
  const underlineStyle = 'underline';

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllChallenges();
      setChallenges(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-2 flex flex-col border h-full text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
      <Image src={logoChu} alt="Logo" width={50} height={50} className="m-3" />
      {challenges?.map((item: Challenge) => (
        <div key={item.id}>
          {activeItem === item.id ? (
            <div>
              <button
                onClick={() => handleItemClick(item.id)}
                className={`p-2 rounded-3xl text-primaryBlue shadow-md shadow-gray-300  border border-gray-100`}
              >
                {item.name}
              </button>
            </div>
          ) : (
            <button onClick={() => handleItemClick(item.id)} className={`p-2`}>
              {item.name}
            </button>
          )}

          {activeItem === item.id && (
            <div className="pl-4 text-xs">
              <button
                className={`${buttonStyle} ${activeSubMenu === 'announcements' ? underlineStyle : ''}`}
                onClick={() => handleSubMenuClick('announcements')}
              >
                Annonces
              </button>
              <button
                className={`${buttonStyle} ${activeSubMenu === 'statistics' ? underlineStyle : ''}`}
                onClick={() => handleSubMenuClick('statistics')}
              >
                Statistique
              </button>
              <button
                className={`${buttonStyle} ${activeSubMenu === 'challenge' ? underlineStyle : ''}`}
                onClick={() => handleSubMenuClick('challenge')}
              >
                Informations
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        className="flex items-center justify-center p-2 rounded-3xl border border-gray-100 text-primaryBlue shadow-md shadow-gray-300"
        onClick={handleNewChallengeClick}
      >
        <FontAwesomeIcon className="mr-1" icon={faAdd} />
        <span>Créer un nouveau challenge</span>
      </button>
    </div>
  );
};

export default Navigation;
