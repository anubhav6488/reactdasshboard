// ChartComponent.js
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

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
      const svg = d3.select(d3Container.current);

      // Clear previous content
      svg.selectAll('*').remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.intensity)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Debugging statements
      console.log('Data for D3:', data);
      console.log('x domain:', data.map(d => d.country));
      console.log('y domain max:', d3.max(data, d => d.intensity));

      svg.append('g')
        .selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', d => x(d.country))
        .attr('y', d => y(d.intensity))
        .attr('height', d => {
          console.log('Height calculation:', y(0) - y(d.intensity));  // Debugging statement
          return y(0) - y(d.intensity);
        })
        .attr('width', x.bandwidth())
        .attr('fill', 'steelblue')
        .append('title')  // Adding tooltip
        .text(d => `Intensity: ${d.intensity}`);

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");  // Rotating x-axis labels for better readability

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Adding Y-axis label
      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", "-2.5em")
        .attr("dx", "-15em")
        .attr("transform", "rotate(-90)")
        .text("Intensity");
    }
  }, [data]);

  return (
    <svg
      ref={d3Container}
      width={800}
      height={400}
    />
  );
};

export default ChartComponent;
