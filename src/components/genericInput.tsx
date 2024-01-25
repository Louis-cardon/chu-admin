import React, { FC, InputHTMLAttributes } from 'react';

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const GenericInput: FC<GenericInputProps> = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700">{label}</label>
      <input 
        {...rest}
        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-black" 
      />
    </div>
  );
};

export default GenericInput;
