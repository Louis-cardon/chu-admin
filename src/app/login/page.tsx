'use client';

import Image from 'next/image';
import React, { FC, useState } from 'react';
import { login } from './action';
import GenericInput from '@/components/genericInput';
import { useRouter } from 'next/navigation';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      await login(formData);
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col md:flex-row border rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
          <div className="p-6 space-y-4 flex flex-col items-center w-full md:w-1/2">
            <Image
              src="/assets/LOGO-APP-CHU.png"
              alt="Logo"
              width={100}
              height={100}
            />
            <GenericInput
              label="Email"
              type="email"
              placeholder="Entrez votre email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <GenericInput
              label="Mot de passe"
              type="password"
              placeholder="Entrez votre mot de passe"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-auto py-2 text-white bg-primaryBlue rounded-3xl px-2 mt-4"
              type="submit"
            >
              Se connecter
            </button>
          </div>
          <div className="w-full md:w-1/2 relative">
            <Image
              src="/assets/charle-nicolle.png"
              alt="Side Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
