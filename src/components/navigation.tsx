import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faRightFromBracket,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState, FC } from 'react';
import Image from 'next/image';
import logoChu from '../assets/logo-CHU.png';

type Challenge = {
  id: number;
  title: string;
};

interface NavigationProps {
  onNavigate: (page: string) => void;
}

const Navigation: FC<NavigationProps> = ({ onNavigate }) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, title: 'Challenge 2024' },
    { id: 2, title: 'Challenge 2025' },
    { id: 3, title: 'Challenge 2026' },
  ]);

  const handleItemClick = (itemId: number, pageTitle: string) => {
    setActiveItem(itemId);
    onNavigate(pageTitle);
  };

  const buttonStyle = 'p-1 block border-l';

  return (
    <div className="p-2 flex flex-col border h-full text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
      <Image src={logoChu} alt="Logo" width={50} height={50} className="m-3" />
      {challenges.map((item: Challenge) => (
        <div key={item.id}>
          {activeItem === item.id ? (
            <div>
              <button
                onClick={() => handleItemClick(item.id, item.title)}
                className={`p-2 rounded-3xl text-primaryBlue shadow-md shadow-gray-300  border border-gray-100`}
              >
                {item.title}
                <FontAwesomeIcon
                  className="text-gray-200 ml-4 text-xs"
                  icon={faTrash}
                />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleItemClick(item.id, item.title)}
              className={`p-2`}
            >
              {item.title}
            </button>
          )}

          {activeItem === item.id && (
            <div className="pl-4 text-xs">
              <button className={buttonStyle}>Informations</button>
              <button className={buttonStyle}>Annonces</button>
              <button className={buttonStyle}>Statistique</button>
            </div>
          )}
        </div>
      ))}

      <button className="flex items-center justify-center p-2 rounded-3xl border border-gray-100 text-primaryBlue shadow-md shadow-gray-300">
        <FontAwesomeIcon className="mr-1" icon={faAdd} />
        <span>Créer un nouveau challenge</span>
      </button>
      <button className="mt-auto flex items-center justify-center p-2 rounded-3xl border border-gray-100 text-primaryBlue shadow-md shadow-gray-300">
        <FontAwesomeIcon className="mr-1" icon={faRightFromBracket} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default Navigation;
