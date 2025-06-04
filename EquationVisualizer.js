// src/components/EquationVisualizer.js
import React, { useEffect, useRef } from 'react';
import { parse, compile } from 'mathjs';
import * as d3 from 'd3';
import './EquationVisualizer.css';

const EquationVisualizer = ({ equation }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!equation) return;
    
    try {
      const expr = compile(equation);
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
      
      // Clear previous SVG
      d3.select(svgRef.current).selectAll("*").remove();
      
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);
      
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([-10, 10])
        .range([margin.left, width - margin.right]);
      
      const yScale = d3.scaleLinear()
        .domain([-10, 10])
        .range([height - margin.bottom, margin.top]);
      
      // Add axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
      
      svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis);
      
      svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);
      
      // Generate line data
      const lineData = [];
      for (let x = -10; x <= 10; x += 0.1) {
        try {
          const y = expr.evaluate({ x });
          lineData.push({ x, y });
        } catch (e) {
          // Skip points that can't be evaluated
        }
      }
      
      // Create line generator
      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveNatural);
      
      // Draw line
      svg.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', '#4e73df')
        .attr('stroke-width', 2)
        .attr('d', line);
      
      // Add equation text
      svg.append('text')
        .attr('x', width - margin.right)
        .attr('y', margin.top)
        .attr('text-anchor', 'end')
        .attr('fill', '#333')
        .text(`f(x) = ${equation}`);
        
    } catch (error) {
      console.error('Error visualizing equation:', error);
    }
  }, [equation]);

  return (
    <div className="visualizer">
      <h2>Equation Visualizer</h2>
      {equation ? (
        <>
          <p>Visualizing: {equation}</p>
          <svg ref={svgRef}></svg>
        </>
      ) : (
        <p>Enter an equation in the calculator to visualize it</p>
      )}
    </div>
  );
};

export default EquationVisualizer;
