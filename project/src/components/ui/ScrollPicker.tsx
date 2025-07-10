import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrollPickerProps {
  values: string[] | number[];
  initialValue?: string | number;
  onChange: (value: string | number) => void;
  height?: number;
  itemHeight?: number;
  visibleItems?: number;
  label?: string;
  unit?: string;
}

const ScrollPicker: React.FC<ScrollPickerProps> = ({
  values,
  initialValue,
  onChange,
  height = 200,
  itemHeight = 40,
  visibleItems = 5,
  label,
  unit,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    initialValue ? values.indexOf(initialValue) : Math.floor(values.length / 2)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLineY = height / 2;

  useEffect(() => {
    onChange(values[selectedIndex]);
  }, [selectedIndex, values, onChange]);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / itemHeight);
      
      if (newIndex >= 0 && newIndex < values.length && newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
      }
    }
  };

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    if (containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  };

  return (
    <div className="w-full">
      {label && <div className="text-sm font-medium mb-2 text-center">{label}</div>}
      <div className="relative">
        <div
          ref={containerRef}
          className="overflow-auto hide-scrollbar"
          style={{ height: `${height}px` }}
          onScroll={handleScroll}
        >
          <div style={{ height: `${(values.length + visibleItems - 1) * itemHeight}px` }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                className={`
                  flex items-center justify-center cursor-pointer
                  ${Math.abs(index - selectedIndex) <= Math.floor(visibleItems / 2) ? 'opacity-100' : 'opacity-0'}
                  ${index === selectedIndex ? 'text-primary-500 font-bold text-xl' : 'text-white/70 text-lg'}
                `}
                style={{
                  height: `${itemHeight}px`,
                  position: 'absolute',
                  width: '100%',
                  top: `${index * itemHeight + (height - itemHeight) / 2 - (values.length * itemHeight) / 2 + (Math.floor(visibleItems / 2) * itemHeight)}px`,
                }}
                onClick={() => handleItemClick(index)}
                animate={{
                  opacity: Math.abs(index - selectedIndex) <= Math.floor(visibleItems / 2) ? 1 : 0,
                  scale: index === selectedIndex ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {value}{unit && <span className="ml-1 text-white/50">{unit}</span>}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Selection indicator */}
        <div className="absolute left-0 right-0" style={{ top: `${centerLineY - 1}px` }}>
          <div className="h-[2px] bg-primary-500/30 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPicker;