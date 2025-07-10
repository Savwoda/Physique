import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Math.max(parseInt(e.target.value) || min, min), max);
    onChange(newValue);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-dark-800 text-white hover:bg-dark-700 transition-colors"
          disabled={value <= min}
        >
          <Minus size={20} />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="w-full h-12 bg-dark-800 rounded-lg text-center text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {unit && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 text-sm">
              {unit}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-dark-800 text-white hover:bg-dark-700 transition-colors"
          disabled={value >= max}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;