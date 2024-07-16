import React from 'react';
import './IconButton.css';
import Image from 'next/image';

interface IconButtonProps {
  id?: string;
  icon: string;
  onClick: () => void;
  alt: string;
  title?: string;
  className?: string;
}

export default function IconButton({
  id,
  icon,
  onClick,
  alt,
  title,
  className,
}: IconButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`icon-button ${className}`}
      title={title}
    >
      <Image src={icon} alt={alt} />
    </button>
  );
}
