import React, { FC } from 'react';

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button className="w-auto py-2 text-white bg-primaryBlue rounded-3xl px-2">
      {text}
    </button>
  );
};

export default Button;
