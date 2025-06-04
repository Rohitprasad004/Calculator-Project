// src/App.js
import React, { useState } from 'react';
import Calculator from './components/Calculator';
import EquationVisualizer from './components/EquationVisualizer';
import HistoryTimeline from './components/HistoryTimeline';
import MathReference from './components/MathReference';
import UnitConverter from './components/UnitConverter';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [currentEquation, setCurrentEquation] = useState('');

  const addToHistory = (expression, result) => {
    const newEntry = {
      id: Date.now(),
      expression,
      result,
      timestamp: new Date().toLocaleString()
    };
    setCalculationHistory([newEntry, ...calculationHistory.slice(0, 49)]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>SciCalc Pro</h1>
        <nav>
          <button onClick={() => setActiveTab('calculator')} className={activeTab === 'calculator' ? 'active' : ''}>
            Calculator
          </button>
          <button onClick={() => setActiveTab('visualizer')} className={activeTab === 'visualizer' ? 'active' : ''}>
            Visualizer
          </button>
          <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
            History
          </button>
          <button onClick={() => setActiveTab('reference')} className={activeTab === 'reference' ? 'active' : ''}>
            Reference
          </button>
          <button onClick={() => setActiveTab('converter')} className={activeTab === 'converter' ? 'active' : ''}>
            Converter
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'calculator' && (
          <Calculator 
            onCalculate={addToHistory} 
            setCurrentEquation={setCurrentEquation}
          />
        )}
        
        {activeTab === 'visualizer' && (
          <EquationVisualizer equation={currentEquation} />
        )}
        
        {activeTab === 'history' && (
          <HistoryTimeline history={calculationHistory} />
        )}
        
        {activeTab === 'reference' && (
          <MathReference />
        )}
        
        {activeTab === 'converter' && (
          <UnitConverter />
        )}
      </main>

      <footer>
        <p>SciCalc Pro - Advanced Scientific Calculator</p>
      </footer>
    </div>
  );
}

export default App;
