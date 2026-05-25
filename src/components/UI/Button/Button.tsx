import { type JSX, type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  handleClick?: () => void;
  variant?: string;
}

const Button = ({
  children,
  handleClick,
  variant,
}: ButtonProps): JSX.Element => {
  return (
    <button onClick={handleClick} className={variant}>
      {children}
    </button>
  );
};

export default Button;
