import { Challenge } from '@/types/challenge';
import {
  fetchChallenge,
  insertChallenge,
  updateChallenge,
} from '@/utils/supabase/fetchData';
import { faAdd, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

interface ChallengeComponentProps {
  challengeId: number;
}

const ChallengeComponent: React.FC<ChallengeComponentProps> = ({
  challengeId,
}) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [eventStartDate, setEventStartDate] = useState<Date>(new Date());
  const [eventEndDate, setEventEndDate] = useState<Date>(new Date());
  const [registrationStartDate, setRegistrationStartDate] = useState<Date>(
    new Date()
  );
  const [registrationEndDate, setRegistrationEndDate] = useState<Date>(
    new Date()
  );

  const [challengeName, setChallengeName] = useState<string>('');
  const [challengePassword, setChallengePassword] = useState<string>('');
  const fetchData = async () => {
    if (challengeId !== 0) {
      const fetchedChallenge = await fetchChallenge(challengeId);
      setChallenge(fetchedChallenge);
      if (fetchedChallenge) {
        setEventStartDate(new Date(fetchedChallenge.challenge_start));
        setEventEndDate(new Date(fetchedChallenge.challenge_end));
        setRegistrationStartDate(new Date(fetchedChallenge.enrolment_start));
        setRegistrationEndDate(new Date(fetchedChallenge.enrolment_end));
        setChallengeName(fetchedChallenge.name);
        setChallengePassword(fetchedChallenge.password);
      }
    } else {
      setChallenge(null);
      setEventStartDate(new Date());
      setEventEndDate(new Date());
      setRegistrationStartDate(new Date());
      setRegistrationEndDate(new Date());
      setChallengeName('');
      setChallengePassword('');
    }
  };

  useEffect(() => {
    fetchData();
  }, [challengeId]);

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

  const handleSave = async () => {
    if (challengeId === 0) {
      if (!challengeName || !challengePassword) {
        alert('Please enter a name and password for the new challenge.');
        return;
      }

      const newChallengeId = await insertChallenge({
        name: challengeName,
        challenge_start: eventStartDate.toISOString(),
        challenge_end: eventEndDate.toISOString(),
        enrolment_start: registrationStartDate.toISOString(),
        enrolment_end: registrationEndDate.toISOString(),
        password: challengePassword,
        is_active: false,
      });
      fetchData();
    }
    if (challenge) {
      const updatedChallenge: Partial<Challenge> = {
        name: challengeName,
        challenge_start: eventStartDate.toISOString(),
        challenge_end: eventEndDate.toISOString(),
        enrolment_start: registrationStartDate.toISOString(),
        enrolment_end: registrationEndDate.toISOString(),
        password: challengePassword,
      };
      await updateChallenge(challenge.id, updatedChallenge);
    }
  };

  return (
    <div className="p-2 flex flex-col border text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-3">
          DATES DE L&apos;ÉVÉNEMENT
        </h2>
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
          <div className="p-2 border text-sm rounded-3xl shadow-sm shadow-gray-300 border-gray-100">
            <p>Ajouter le mot de passe :</p>
            <input
              type="password"
              value={challengePassword}
              onChange={(e) => setChallengePassword(e.target.value)}
              placeholder="Ajouter le mot de passe"
              className="p-2 border rounded-md"
            />
          </div>
          <button
            className="flex items-center justify-center p-2 rounded-3xl border border-gray-100 text-primaryBlue shadow-md shadow-gray-300"
            onClick={handleSave}
          >
            {challengeId === 0 ? (
              <>
                <span>Ajouter l&apos;événement</span>
                <FontAwesomeIcon className="ml-2" icon={faAdd} />
              </>
            ) : (
              <>
                <span>Modifier l&apos;événement</span>
                <FontAwesomeIcon className="ml-2" icon={faPencilAlt} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeComponent;
