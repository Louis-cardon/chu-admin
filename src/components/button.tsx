'use client';

import React, { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="w-auto py-2 text-white bg-primaryBlue rounded-3xl px-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
