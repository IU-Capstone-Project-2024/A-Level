import React, { useState } from 'react';
import './InputNumber.css';
import Plus from '../../images/plus.svg';
import Minus from '../../images/minus.svg';

interface InputNumberProps {
    valueNumber: number | undefined;
    setNumberValue: (value: number | undefined) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({ valueNumber, setNumberValue }) => {
  const [error, setError] = useState<string>("");


  const increment = () => {
    if(valueNumber !== undefined){
      if (valueNumber < 20) {
        setNumberValue(valueNumber + 1);
        setError("");
        if (valueNumber < 1){
          setError("The minimum mark is 1.");
        }
      } else {
        setError("The maximum mark is 20.");
      }
    }
    
  };

  const decrement = () => {
    if (valueNumber !== undefined){
      if (valueNumber > 1) {
        setNumberValue(valueNumber - 1);
        setError("");
        if(valueNumber-1 >20){
          setError("The maximum mark is 20.");
        }
      } else {
        setError("The minimum mark is 1.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setNumberValue(newValue);
      if (newValue < 1){
        setError("The minimum mark is 1.");
      } else if (newValue > 20){
        setError("The maximum mark is 20.");
      } else {
        setError("");
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
          <button
            type="button"
            className="increment"
            onClick={increment}
          >
            <img src={Plus} alt="Plus" />
          </button>
          <button
            type="button"
            className="decrement"
            onClick={decrement}
          >
            <img src={Minus} alt="Minus" />
          </button>
        </div>
      </div>
      <span className="input-number-error">{error}</span>
    </div>
  );
};

export default InputNumber;