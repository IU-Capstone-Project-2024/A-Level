'use client';
import selectedOptionIcon from '../../images/selectedOption.svg';
import dropArrowIcon from '../../images/dropArrowIcon.svg';
import './DropdownQuestionsMenu.css';
import { useEffect, useRef, useState } from 'react';
import { Option } from '../Option';
import Image from 'next/image';

interface DropdownProps {
  title: string;
  icon: string;
  options: Option[];
  onOptionClick: (option: Option) => void;
  onOptionUnclick: (option: Option) => void;
  selectedOptions: Option[];
}

export default function Dropdown({
  title,
  icon,
  options,
  onOptionClick,
  onOptionUnclick,
  selectedOptions,
}: DropdownProps) {
  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //if the filter was selected, then unselect it and vice versa
  //if type_id is 3, then this is unavailable option
  const handleOptionClick = (option: Option) => {
    if (option.type_id !== 3) {
      if (selectedOptionIds.includes(option.id)) {
        setSelectedOptionIds(
          selectedOptionIds.filter((id) => id !== option.id),
        );
        onOptionUnclick(option);
      } else {
        setSelectedOptionIds([...selectedOptionIds, option.id]);
        onOptionClick(option);
      }
    }
  };

  //this will handle when the dropdown menu is opened, and the user clicked outside of it, so it will get closed
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //update the selected filters when a change is made
  useEffect(() => {
    setSelectedOptionIds(selectedOptions.map((option) => option.id));
  }, [selectedOptions]);

  return (
    <div className="dropdown-filter" ref={dropdownRef}>
      <button
        className="dropbtn"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Image src={icon} alt="icon" className="dropDownIcon"></Image>
        {title}
        <Image
          src={dropArrowIcon}
          className="arrow-down"
          alt="arrow-icon"
        ></Image>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              key={option.id}
              className={`option ${selectedOptionIds.includes(option.id) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              <Image
                src={selectedOptionIcon}
                alt=""
                className={`option-img ${selectedOptionIds.includes(option.id) ? 'visible' : 'hidden'}`}
              />
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
