'use client';

import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import logoChu from '@/../public/assets/LOGO-APP-CHU.png';
import sideImage from '@/../public/assets/charle-nicolle.png';
import Button from '@/components/button';
import GenericInput from '@/components/genericInput';
import { useRouter } from 'next/navigation';

const Login: FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col md:flex-row border rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="p-6 space-y-4 flex flex-col items-center w-full md:w-1/2">
          <Image src={logoChu} alt="Logo" width={100} height={100} />
          <GenericInput
            label="Email"
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <GenericInput
            label="Mot de passe"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text="Se connecter" onClick={handleSubmit} />
        </div>
        <div className="w-full md:w-1/2 relative">
          <Image
            src={sideImage}
            alt="Side Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
