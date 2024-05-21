// App.js
import React from 'react';
import ChartComponent from './components/ChartComponent';

const App = () => {
  return (
    <div className="App">
      <h1>D3.js Graphs</h1>
      <h2>Bar Chart</h2>
      <ChartComponent chartType="bar-chart-data" />
      <h2>Pie Chart</h2>
      <ChartComponent chartType="pie-chart-data" />
    </div>
  );
};

export default App;
