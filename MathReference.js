// src/components/MathReference.js
import React, { useState } from 'react';
import './MathReference.css';

const MathReference = () => {
  const [activeCategory, setActiveCategory] = useState('algebra');
  
  const categories = {
    algebra: [
      { name: 'Quadratic Formula', formula: 'x = [-b ± √(b²-4ac)] / 2a' },
      { name: 'Pythagorean Theorem', formula: 'a² + b² = c²' },
      { name: 'Distance Formula', formula: 'd = √[(x₂-x₁)² + (y₂-y₁)²]' },
      { name: 'Slope Formula', formula: 'm = (y₂-y₁)/(x₂-x₁)' }
    ],
    geometry: [
      { name: 'Area of Circle', formula: 'A = πr²' },
      { name: 'Circumference', formula: 'C = 2πr' },
      { name: 'Area of Triangle', formula: 'A = ½bh' },
      { name: 'Volume of Sphere', formula: 'V = ⁴⁄₃πr³' }
    ],
    calculus: [
      { name: 'Derivative Power Rule', formula: 'd/dx(xⁿ) = nxⁿ⁻¹' },
      { name: 'Integration Power Rule', formula: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C' },
      { name: 'Fundamental Theorem', formula: '∫ₐᵇ f(x) dx = F(b) - F(a)' }
    ],
    constants: [
      { name: 'Pi (π)', value: '3.1415926535' },
      { name: 'Euler\'s Number (e)', value: '2.7182818284' },
      { name: 'Golden Ratio (φ)', value: '1.6180339887' },
      { name: 'Speed of Light (c)', value: '299792458 m/s' }
    ]
  };

  return (
    <div className="math-reference">
      <h2>Math Reference Library</h2>
      
      <div className="category-selector">
        {Object.keys(categories).map(category => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="reference-content">
        <h3>{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>{activeCategory === 'constants' ? 'Value' : 'Formula'}</th>
            </tr>
          </thead>
          <tbody>
            {categories[activeCategory].map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.formula || item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MathReference;
