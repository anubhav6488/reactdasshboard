// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import ChartComponent from './ChartComponent';

// const Dashboard = () => {
//   // Sample data for demonstration
//   const [graph1Data, setGraph1Data] = useState([]);
//   const [graph2Data, setGraph2Data] = useState([]);
//   const [graph3Data, setGraph3Data] = useState([]);

//   useEffect(() => {
//     // Fetch data for graph 1
//     const fetchDataForGraph1 = async () => {
//       try {
//         // Fetch data from API or other source
//         const data = await fetchGraphData('graph1'); // Example function to fetch data
//         setGraph1Data(data);
//       } catch (error) {
//         console.error('Error fetching data for graph 1:', error);
//       }
//     };

//     // Fetch data for graph 2
//     const fetchDataForGraph2 = async () => {
//       try {
//         // Fetch data from API or other source
//         const data = await fetchGraphData('graph2'); // Example function to fetch data
//         setGraph2Data(data);
//       } catch (error) {
//         console.error('Error fetching data for graph 2:', error);
//       }
//     };

//     // Fetch data for graph 3
//     const fetchDataForGraph3 = async () => {
//       try {
//         // Fetch data from API or other source
//         const data = await fetchGraphData('graph3'); // Example function to fetch data
//         setGraph3Data(data);
//       } catch (error) {
//         console.error('Error fetching data for graph 3:', error);
//       }
//     };

//     // Call functions to fetch data for each graph
//     fetchDataForGraph1();
//     fetchDataForGraph2();
//     fetchDataForGraph3();
//   }, []);

//   // Example function to fetch data (replace with actual data fetching logic)
//   const fetchGraphData = async (graphType) => {
//     // Example API endpoint
//     const apiUrl = `http://127.0.0.1:8000/${graphType}/`;

//     // Fetch data from API
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     // Parse JSON response
//     const data = await response.json();
//     return data;
//   };

//   return (
//     <div className="dashboard">
//       <div className="sidebar">
//         <ul>
//           <li><a href="#graph1">Graph 1</a></li>
//           <li><a href="#graph2">Graph 2</a></li>
//           <li><a href="#graph3">Graph 3</a></li>
//         </ul>
//       </div>
//       <div className="main">
//         <div className="partition">
//           <h2 id="graph1">Graph 1</h2>
//           <ChartComponent data={graph1Data} />
//         </div>
//         <div className="partition">
//           <h2 id="graph2">Graph 2</h2>
//           <ChartComponent data={graph2Data} />
//         </div>
//         <div className="partition">
//           <h2 id="graph3">Graph 3</h2>
//           <ChartComponent data={graph3Data} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
