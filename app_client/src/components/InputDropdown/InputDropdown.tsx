import React, { useState } from 'react';
import './InputDropdown.css';
import DropdownArrow from '../../images/down-violet.svg';
import DropdownArrowOpen from '../../images/up-violet.svg';

interface Option {
  value: string;
  label: string;
}

interface InputDropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const InputDropdown: React.FC<InputDropdownProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selected || 'Select an option'}
        {isOpen ? <img src={DropdownArrowOpen} alt="open"></img> :<img src={DropdownArrow} alt="open"></img>}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelect(option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;