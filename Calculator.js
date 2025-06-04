// src/components/Calculator.js
import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

const Calculator = ({ onCalculate, setCurrentEquation }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);
  const [isScientific, setIsScientific] = useState(true);
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const calcResult = evaluate(input);
        setResult(calcResult);
        onCalculate(input, calcResult);
        setHistory([...history, { input, result: calcResult }]);
        setCurrentEquation(input);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else if (value === 'M+') {
      setMemory(memory + parseFloat(result || 0));
    } else if (value === 'M-') {
      setMemory(memory - parseFloat(result || 0));
    } else if (value === 'MR') {
      setInput(input + memory.toString());
    } else if (value === 'MC') {
      setMemory(0);
    } else if (value === '±') {
      setInput(input.startsWith('-') ? input.slice(1) : `-${input}`);
    } else if (value === 'x²') {
      setInput(`(${input})^2`);
    } else if (value === '√') {
      setInput(`sqrt(${input})`);
    } else if (value === 'π') {
      setInput(`${input}π`);
    } else if (value === 'e') {
      setInput(`${input}e`);
    } else {
      setInput(input + value);
    }
  };

  const scientificButtons = [
    'sin', 'cos', 'tan', 'log', 'ln', 
    'x²', 'x^y', '√', 'π', 'e', '!', 
    '(', ')', 'abs'
  ];

  const basicButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  const controlButtons = [
    'C', '⌫', '±', 'M+', 
    'M-', 'MR', 'MC'
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
        <div className="memory">M: {memory}</div>
      </div>

      <div className="toggle">
        <button onClick={() => setIsScientific(!isScientific)}>
          {isScientific ? 'Basic Mode' : 'Scientific Mode'}
        </button>
      </div>

      <div className="keypad">
        <div className="controls">
          {controlButtons.map((btn) => (
            <button key={btn} onClick={() => handleButtonClick(btn)}>
              {btn}
            </button>
          ))}
        </div>

        {isScientific && (
          <div className="scientific-buttons">
            {scientificButtons.map((btn) => (
              <button key={btn} onClick={() => handleButtonClick(btn)}>
                {btn}
              </button>
            ))}
          </div>
        )}

        <div className="basic-buttons">
          {basicButtons.map((btn) => (
            <button key={btn} onClick={() => handleButtonClick(btn)}>
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="history">
        <h3>Recent Calculations</h3>
        <ul>
          {history.slice(0, 3).map((item, index) => (
            <li key={index}>
              {item.input} = {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
