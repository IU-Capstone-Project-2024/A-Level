import React from 'react';
import './IconButton.css';

interface IconButtonProps {
  icon: string;
  onClick: () => void;
  alt: string;
  title?: string;
  className?: string;
}

export default function IconButton({
  icon,
  onClick,
  alt,
  title,
  className,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`icon-button ${className}`}
      title={title}
    >
      <img src={icon} alt={alt} />
    </button>
  );
}
