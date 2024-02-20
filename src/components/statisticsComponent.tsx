import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import './../css/scrollbar-styled.css';

interface StatisticsComponentProps {
  challengeId: number;
}

const StatisticsComponent = ({ challengeId }: StatisticsComponentProps) => {
  const ids = [
    'id00001',
    'id00002',
    'id00003',
    'id00004',
    'id00005',
    'id00006',
    'id00007',
    'id00008',
    'id00009',
    'id00001',
    'id00002',
    'id00003',
    'id00004',
    'id00005',
    'id00006',
    'id00007',
    'id00008',
    'id00009',
    'id00001',
    'id00002',
    'id00003',
    'id00004',
    'id00005',
    'id00006',
    'id00007',
    'id00008',
    'id00009',
  ];

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-3xl shadow-sm shadow-gray-300 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-center">STATISTIQUES</h2>
      <div className="p-6 flex-grow overflow-auto mb-4 shadow-sm shadow-gray-300 border border-gray-100 rounded-3xl scrollbar-styled">
        {ids.map((id) => (
          <div
            key={id}
            className="flex items-center justify-between p-2 m-2 shadow-sm shadow-gray-300 border border-gray-100 rounded-3xl"
          >
            <span className="flex-grow">{id}</span>
            <button>
              <FontAwesomeIcon className="text-gray-200" icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-4">
        <button className="w-auto py-2 text-white bg-primaryBlue rounded-3xl px-2">
          <span>Importer une liste*</span>
          <FontAwesomeIcon icon={faDownload} className="ml-2" />
        </button>
        <button className="w-auto py-2 text-white bg-primaryBlue rounded-3xl px-2">
          <span>Exporter une liste*</span>
          <FontAwesomeIcon icon={faUpload} className="ml-2" />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        * Format accepté : .csv uniquement
      </p>
    </div>
  );
};

export default StatisticsComponent;
