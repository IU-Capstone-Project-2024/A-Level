'use client';
import React, { useState } from 'react';
import './YearPicker.css';
// prettier-ignore-start
import LeftArrowIcon from '../../images/left-arrow.svg';
import RightArrowIcon from '../../images/right-arrow.svg';
import DropdownArrow from '../../images/down-violet.svg';
import DropdownArrowOpen from '../../images/up-violet.svg';
// prettier-ignore-end
import Image from 'next/image';

interface YearPickerProps {
  selectedYear: number | null;
  onChange: (year: number) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  currentYear: number;
}

const YearPicker: React.FC<YearPickerProps> = ({
  currentYear,
  selectedYear,
  onChange,
  error,
  setError,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const getDecadeStartYear = (year: number): number => {
    return Math.floor(year / 10) * 10;
  };

  const [startYear, setStartYear] = useState<number>(
    getDecadeStartYear(selectedYear || new Date().getFullYear()),
  );
  const handlePrevDecade = () => {
    setStartYear(startYear - 10);
  };

  const handleNextDecade = () => {
    setStartYear(startYear + 10);
  };

  const handleYearClick = (year: number) => {
    onChange(year);
    setDropdownOpen(false);
    if (currentYear !== null && year > currentYear) {
      setError('Do you have a question from future?');
    } else {
      setError('');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="year-picker-container">
      <div className="year-picker">
        <div className="year-picker-dropdown">
          <button
            type="button"
            className="dropdown-toggle"
            onClick={toggleDropdown}
          >
            {selectedYear ? selectedYear : 'Select an option'}{' '}
            <span className="arrow">
              {dropdownOpen ? (
                <Image src={DropdownArrowOpen} alt="open"></Image>
              ) : (
                <Image src={DropdownArrow} alt="open"></Image>
              )}
            </span>
          </button>
          {dropdownOpen && (
            <div className="year-picker-dropdown-content">
              <div className="year-picker-header">
                <button
                  type="button"
                  className="nav-button"
                  onClick={handlePrevDecade}
                >
                  <Image src={LeftArrowIcon} alt="Left Arrow" />
                </button>
                <span className="decade-display">{`${startYear}-${startYear + 9}`}</span>
                <button
                  type="button"
                  className="nav-button"
                  onClick={handleNextDecade}
                >
                  <Image src={RightArrowIcon} alt="Right Arrow" />
                </button>
              </div>
              <div className="year-picker-grid">
                {[...Array(10)].map((_, index) => {
                  const year = startYear + index;
                  return (
                    <div
                      key={year}
                      className={`year ${year === selectedYear ? 'selected' : ''}`}
                      onClick={() => handleYearClick(year)}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="year-picker-error">{error}</span>
    </div>
  );
};

export default YearPicker;
