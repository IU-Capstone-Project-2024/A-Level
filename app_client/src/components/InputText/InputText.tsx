import React, { ChangeEvent } from 'react';
import './InputText.css';

interface InputProps {
  label: string | null;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus:() => void;
}

const InputText: React.FC<InputProps> = ({ label, value, onChange, onFocus}) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <textarea name="body" className='custom-input'
          onChange={onChange}
          onFocus={onFocus}
          value={value}/>
    </div>
  );
};

export default InputText;