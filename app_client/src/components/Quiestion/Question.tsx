import { useState } from 'react';
import InputText from '../InputText/InputText';
import './Question.css';
import InputDropdown from '../InputDropdown/InputDropdown';
import InputNumber from '../InputNumber/InputNumber';
import YearPicker from '../YearPicker/YearPicker';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

export default function CreateQuestion(){
    const [inputValueText, setInputValueText] = useState('Enter the task...');
    const [valueMark, setValueMark] = useState<number | undefined>(1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };

    const handleSelect = (value: string) => {
        console.log('Selected:', value);
    };
    
    return (
        <div className="question-container-without-border">
            <div className="question-container-heading">
                <h2 className="question-container-heading-text">Create question</h2>
            </div>
            <form className="question-container-content">
                <div className='question-container-text'>
                    <InputText
                        label={null}
                        value={inputValueText}
                        onFocus={() => setInputValueText("")}
                        onChange={(e) => setInputValueText(e.target.value)}
                    />
                </div>
                
                <div className='question-details'>
                    <div className='choose'>
                    <label htmlFor='topic'>Topic</label>
                    <InputDropdown options={options} onSelect={handleSelect} />
                    </div>
                    <div className='choose'>
                    <label htmlFor='mark'>Mark</label>
                    <InputNumber valueNumber={valueMark} setNumberValue={setValueMark}/>
                    </div>
                    <div className='choose'>
                    <label htmlFor='year'>Year</label>
                    <YearPicker selectedYear={selectedYear} onChange={handleYearChange} />
                    </div>
                    
                    <div className='question-buttons'>
                        
                    </div>
                </div>
            </form>
        </div>
    );
};