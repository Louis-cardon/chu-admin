import Image from 'next/image';
import React, { FC } from 'react';
import logoChu from '../../assets/LOGO-APP-CHU.png'; 
import sideImage from '../../assets/charle-nicolle.png'; 

const Login: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col md:flex-row border rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="p-6 space-y-4 flex flex-col items-center w-full md:w-1/2">
          <Image src={logoChu} alt="Logo" width={100} height={100} />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-2 border rounded-md"
          />
          <button className="py-2 text-white bg-blue-500 rounded-xl px-2">
            Se connecter
          </button>
        </div>
        <div className="w-full md:w-1/2 relative">
          <Image src={sideImage} alt="Side Image" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
