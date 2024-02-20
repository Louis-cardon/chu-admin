import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

interface ChallengeComponentProps {
  challengeId: number;
}

const ChallengeComponent = ({ challengeId }: ChallengeComponentProps) => {
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [registrationStartDate, setRegistrationStartDate] = useState(
    new Date()
  );
  const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
  const [challengeName, setChallengeName] = useState('');

  const handleEventStartDateChange = (date: Date | null) => {
    if (date) setEventStartDate(date);
  };

  const handleEventEndDateChange = (date: Date | null) => {
    if (date) setEventEndDate(date);
  };

  const handleRegistrationStartDateChange = (date: Date | null) => {
    if (date) setRegistrationStartDate(date);
  };

  const handleRegistrationEndDateChange = (date: Date | null) => {
    if (date) setRegistrationEndDate(date);
  };

  return (
    <div className="p-2 flex flex-col border text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-3">DATES DE L'ÉVÉNEMENT</h2>
        <div className="flex justify-between p-2 m-2 border text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
          <div>
            <p>Date de début :</p>
            <DatePicker
              selected={eventStartDate}
              onChange={handleEventStartDateChange}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="w-px bg-gray-300 h-12" />
          <div>
            <p>Date de fin :</p>
            <DatePicker
              selected={eventEndDate}
              onChange={handleEventEndDateChange}
              className="p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-3">DATES DES INSCRIPTIONS</h2>
        <div className="flex justify-between p-2 m-2 border text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
          <div>
            <p>Date de début :</p>
            <DatePicker
              selected={registrationStartDate}
              onChange={handleRegistrationStartDateChange}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="w-px bg-gray-300 h-12" />
          <div>
            <p>Date de fin :</p>
            <DatePicker
              selected={registrationEndDate}
              onChange={handleRegistrationEndDateChange}
              className="p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-3">NOM DU CHALLENGE</h2>
        <div className="flex items-center justify-center space-x-4">
          <div className="p-2 border text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
            <p>Ajouter le nom :</p>
            <input
              type="text"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
              placeholder="Ajouter le nom"
              className="p-2 border rounded-md"
            />
          </div>
          <button className="flex items-center justify-center p-2 rounded-3xl border border-gray-100 text-primaryBlue shadow-md shadow-gray-300">
            <span>Ajouter l'événement</span>
            <FontAwesomeIcon className="ml-2" icon={faAdd} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeComponent;
