import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './ChartComponent.css'; // Import CSS file

const ChartComponent = ({ chartType }) => {
  const [data, setData] = useState([]);
  const d3Container = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/${chartType}/`);
        if (!res.ok) throw new Error('Oops! An error has occurred');
        const json = await res.json();
        console.log('Fetched data:', json);  // Log fetched data
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [chartType]);

  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      const margin = { top: 20, right: 20, bottom: 60, left: 60 }; // Adjusted bottom and left margins for axis labels
      const width = 800 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      const svg = d3.select(d3Container.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const attributes = ["intensity", "likelihood", "relevance", "start_year", "country", "topic", "region", "end_year"];

      x.domain(d3.extent(data, d => d.intensity)).nice();
      y.domain(d3.extent(data, d => d.likelihood)).nice();

      attributes.forEach(attrX => {
        attributes.forEach(attrY => {
          if (attrX !== attrY) {
            const circleRadius = 5;
            svg.selectAll(`.${attrX}-${attrY}`)
              .data(data)
              .enter().append("circle")
              .attr("class", d => `${attrX}-${attrY}`)
              .attr("cx", d => x(d[attrX]))
              .attr("cy", d => y(d[attrY]))
              .attr("r", circleRadius)
              .style("fill", d => color(attrX))
              .style("opacity", 0.7)
              .append("title")
              .text(d => `${attrX}: ${d[attrX]}, ${attrY}: ${d[attrY]}`);
          }
        });
      });

      attributes.forEach(attr => {
        svg.append("g")
          .attr("class", `axis axis-${attr}`)
          .attr("transform", attr === "start_year" ? `translate(0,${height})` : attr === "intensity" ? `translate(0,0)` : `translate(${width},0)`)
          .call(attr === "start_year" ? d3.axisBottom(x).ticks(5).tickSizeOuter(0) : d3.axisLeft(y).ticks(5).tickSizeOuter(0));
      });
    }
  }, [data]);

  return (
    <svg
      ref={d3Container}
      className="chart-svg" // Apply class for styling
      width={800}
      height={600}
    />
  );
};

export default ChartComponent;
