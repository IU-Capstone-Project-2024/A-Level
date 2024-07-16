'use client';
import React, { useState } from 'react';
import './InputDropdown.css';
import DropdownArrow from '../../images/down-violet.svg';
import DropdownArrowOpen from '../../images/up-violet.svg';
import Image from 'next/image';

interface Option {
  value: number;
  label: string;
}

interface InputDropdownProps {
  options: Option[];
  onSelect: (value: number, label: string) => void;
  error: string;
  selectedTopicLabel: string;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  options,
  onSelect,
  error,
  selectedTopicLabel,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: Option) => {
    onSelect(option.value, option.label);
    setIsOpen(false);
  };

  return (
    <div className="input-dropdown">
      <div className="input-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedTopicLabel}
        {isOpen ? (
          <Image src={DropdownArrowOpen} alt="open"></Image>
        ) : (
          <Image src={DropdownArrow} alt="open"></Image>
        )}
      </div>
      {isOpen && (
        <ul className="input-dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="input-dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <span className="input-dropdown-error">{error}</span>
    </div>
  );
};

export default InputDropdown;
