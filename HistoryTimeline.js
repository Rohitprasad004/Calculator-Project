// src/components/HistoryTimeline.js
import React from 'react';
import './HistoryTimeline.css';

const HistoryTimeline = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="history-timeline">
        <h2>Calculation History</h2>
        <p>No calculations yet. Start calculating to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="history-timeline">
      <h2>Calculation Timeline</h2>
      <div className="timeline">
        {history.map((entry) => (
          <div key={entry.id} className="timeline-item">
            <div className="timeline-point"></div>
            <div className="timeline-content">
              <div className="calculation">
                <span className="expression">{entry.expression}</span>
                <span className="equals"> = </span>
                <span className="result">{entry.result}</span>
              </div>
              <div className="timestamp">{entry.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeline;
