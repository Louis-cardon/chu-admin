import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface AnnouncementsComponentProps {
  challengeId: number;
}

const AnnouncementsComponent = ({
  challengeId,
}: AnnouncementsComponentProps) => {
  const [announcements, setAnnouncements] = useState([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleNewAnnouncementChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewAnnouncement(e.target.value);
  };

  const submitNewAnnouncement = () => {
    if (newAnnouncement.trim() !== '') {
      setAnnouncements([...announcements, newAnnouncement]);
      setNewAnnouncement('');
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-3xl shadow-sm shadow-gray-300 border border-gray-100 o">
      <h1 className="text-3xl font-semibold mb-4 text-center">MES ANNONCES</h1>
      <div className="flex-grow overflow-auto mb-4 p-4 shadow-sm shadow-gray-300 border border-gray-100 rounded-3xl">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 my-2 shadow-sm shadow-gray-300 border border-gray-100 rounded-3xl"
          >
            <span className="flex-grow">{announcement}</span>
            <button>
              <FontAwesomeIcon icon={faTrashAlt} className="text-gray-200" />
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-semibold mb-4 text-center">
        AJOUTER UNE ANNONCE
      </h2>
      <div className="flex-grow p-4 border text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
        <textarea
          className="w-full h-32 p-4 mb-4 bg-gray-100 rounded-lg"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          placeholder="Écrivez votre annonce ici..."
        />
        <button
          onClick={submitNewAnnouncement}
          className="w-full text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg flex justify-center items-center"
        >
          Valider
          <FontAwesomeIcon icon={faCheck} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsComponent;
