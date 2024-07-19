import React from 'react';
import './InputNumber.css';
// prettier-ignore-start
import Plus from '../../images/plus.svg';
import Minus from '../../images/minus.svg';
// prettier-ignore-end
import Image from 'next/image';

interface InputNumberProps {
  valueNumber: number | undefined;
  setNumberValue: (value: number | undefined) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const InputNumber: React.FC<InputNumberProps> = ({
  valueNumber,
  setNumberValue,
  error,
  setError,
}) => {
  const increment = () => {
    if (valueNumber !== undefined) {
      if (valueNumber < 20) {
        setNumberValue(valueNumber + 1);
        setError('');
        if (valueNumber + 1 < 1) {
          setError('The minimum mark is 1.');
        }
      } else {
        setError('The maximum mark is 20.');
      }
    } else {
      setNumberValue(1);
      setError('');
    }
  };

  const decrement = () => {
    if (valueNumber !== undefined) {
      if (valueNumber > 1) {
        setNumberValue(valueNumber - 1);
        setError('');
        if (valueNumber - 1 > 20) {
          setError('The maximum mark is 20.');
        }
      } else {
        setError('The minimum mark is 1.');
      }
    } else {
      setNumberValue(20);
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setNumberValue(newValue);
      if (newValue < 1) {
        setError('The minimum mark is 1.');
      } else if (newValue > 20) {
        setError('The maximum mark is 20.');
      } else {
        setError('');
      }
    } else {
      setNumberValue(undefined);
    }
  };

  return (
    <div className="input-number-container">
      <div className="input-number-container-inner">
        <input
          type="number"
          className="number-display"
          onFocus={() => setNumberValue(undefined)}
          value={valueNumber}
          onChange={handleChange}
          max={20}
        />
        <div className="buttons-plus-minus">
          <button type="button" className="increment" onClick={increment}>
            <Image src={Plus} alt="Plus" />
          </button>
          <button type="button" className="decrement" onClick={decrement}>
            <Image src={Minus} alt="Minus" />
          </button>
        </div>
      </div>
      <span className="input-number-error">{error}</span>
    </div>
  );
};

export default InputNumber;
