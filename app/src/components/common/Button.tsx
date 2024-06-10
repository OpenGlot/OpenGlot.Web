import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  variant?:
    | 'default'
    | 'selected'
    | 'disabled'
    | 'correct'
    | 'incorrect'
    | 'emphasized'
    | 'filled'
    | 'no-fill';
  width: string;
  type?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = 'default',
  width,

  children,
}) => {
  let className = `p-2 border-2 cursor-pointer text-center flex justify-center items-center rounded-lg button-hover-animation transition-all ease-linear duration-200 ${width}`;

  switch (variant) {
    case 'selected':
      className += ' bg-sky-100 border-sky-300 text-sky-500';
      break;
    case 'disabled':
      className += ' border-gray-100 text-gray-200 cursor-not-allowed';
      break;
    case 'correct':
      className += ' bg-green-100 border-green-300 text-green-500';
      break;
    case 'incorrect':
      className += ' bg-red-100 border-red-300 text-red-500';
      break;
    case 'emphasized':
      className +=
        ' border-gray-500 active:border-gray-900 hover:bg-gray-700 hover:border-gray-700 hover:text-white active:bg-gray-900';
      break;
    case 'filled':
      className +=
        ' border-gray-800 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-700 active:border-gray-900 active:bg-gray-900';
      break;
    case 'no-fill':
      className +=
        ' border-white hover:border-gray-100 hover:bg-gray-100 active:bg-gray-200 active:border-gray-200';
      break;
    default:
      className += ' border-gray-100';
      break;
  }

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={variant === 'disabled'}
    >
      {children}
    </button>
  );
};

export default Button;
