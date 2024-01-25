import Image from 'next/image';
import React, { FC } from 'react';
import logoChu from '../../assets/LOGO-APP-CHU.png'; 
import sideImage from '../../assets/charle-nicolle.png';
import Button from '@/components/button';
import GenericInput from '@/components/genericInput';

const Login: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col md:flex-row border rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="p-6 space-y-4 flex flex-col items-center w-full md:w-1/2">
          <Image src={logoChu} alt="Logo" width={100} height={100} />
          <GenericInput label="Nom d'utilisateur" type="text" placeholder="Entrez votre nom d'utilisateur" />
          <GenericInput label="Mot de passe" type="password" placeholder="Entrez votre mot de passe" />
          <Button text="Se connecter" />
        </div>
        <div className="w-full md:w-1/2 relative">
          <Image src={sideImage} alt="Side Image" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
