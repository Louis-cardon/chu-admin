import { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSubmitting: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  isSubmitting,
}: ButtonProps) => {
  return (
    <button
      className="w-auto py-2 text-white bg-primaryBlue rounded-3xl px-2"
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? 'Submitting...' : text}
    </button>
  );
};

export default Button;
