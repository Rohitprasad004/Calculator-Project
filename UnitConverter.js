// src/components/UnitConverter.js
import React, { useState } from 'react';
import './UnitConverter.css';

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [inputValue, setInputValue] = useState(1);
  const [outputValue, setOutputValue] = useState(0.001);

  const conversionFactors = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371
    },
    area: {
      'square meter': 1,
      'square kilometer': 0.000001,
      'square foot': 10.7639,
      'square inch': 1550,
      acre: 0.000247105,
      hectare: 0.0001
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      'cubic meter': 0.001,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.00110231
    },
    temperature: {
      celsius: 1,
      fahrenheit: 33.8,
      kelvin: 274.15
    }
  };

  const convert = () => {
    if (category === 'temperature') {
      if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') {
          setOutputValue((inputValue * 9/5) + 32);
        } else if (toUnit === 'kelvin') {
          setOutputValue(inputValue + 273.15);
        } else {
          setOutputValue(inputValue);
        }
      } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') {
          setOutputValue((inputValue - 32) * 5/9);
        } else if (toUnit === 'kelvin') {
          setOutputValue(((inputValue - 32) * 5/9) + 273.15);
        } else {
          setOutputValue(inputValue);
        }
      } else if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') {
          setOutputValue(inputValue - 273.15);
        } else if (toUnit === 'fahrenheit') {
          setOutputValue(((inputValue - 273.15) * 9/5) + 32);
        } else {
          setOutputValue(inputValue);
        }
      }
    } else {
      const factorFrom = conversionFactors[category][fromUnit];
      const factorTo = conversionFactors[category][toUnit];
      setOutputValue((inputValue / factorFrom) * factorTo);
    }
  };

  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, category]);

  return (
    <div className="unit-converter">
      <h2>Unit Converter</h2>
      
      <div className="converter-controls">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="length">Length</option>
          <option value="area">Area</option>
          <option value="volume">Volume</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
        
        <div className="conversion-row">
          <input 
            type="number" 
            value={inputValue} 
            onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
          />
          
          <select 
            value={fromUnit} 
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {Object.keys(conversionFactors[category]).map(unit => (
              <option key={`from-${unit}`} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          
          <span>to</span>
          
          <input 
            type="number" 
            value={outputValue.toFixed(6)} 
            readOnly 
          />
          
          <select 
            value={toUnit} 
            onChange={(e) => setToUnit(e.target.value)}
          >
            {Object.keys(conversionFactors[category]).map(unit => (
              <option key={`to-${unit}`} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="conversion-info">
        <p>
          {inputValue} {fromUnit} = {outputValue.toFixed(6)} {toUnit}
        </p>
      </div>
    </div>
  );
};

export default UnitConverter;
