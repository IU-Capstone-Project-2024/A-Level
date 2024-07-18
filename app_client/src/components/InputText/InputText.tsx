import React, { ChangeEvent } from 'react';
import './InputText.css';

interface InputProps {
  label: string | null;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputText: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <textarea
        className="custom-input"
        onChange={onChange}
        placeholder="Enter the task..."
        value={value}
      />
    </div>
  );
};

export default InputText;
