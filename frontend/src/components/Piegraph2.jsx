import React from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from 'chart.js'

ChartJS.register(Tooltip, Legend, ArcElement)

const Piegraph2 = ({graphdata}) => {

    const data = {
        labels: [
            'Wheat',
            'Sugar',
            'Daal',
            'Ghee',
            'Oil'
          ],

        datasets: [{
          
          data: graphdata,
          backgroundColor: ['red', 'blue', 'yellow','green','orange'],
          hoverOffset: 4
        }]
      };

      // Options for the pie chart
  const options = {
    responsive: true,
    plugins: {

      legend: {
        position: 'bottom',
        align: 'center',
        
        labels: {
           
            usePointStyle: true, // Set the label to be a circle (usePointStyle makes it a circle instead of the rectangle)
            pointStyle: 'circle', // Ensure point style is circle
            padding: 12,
          },
      },

      tooltip: {
        // Custom tooltip callback to show dynamic labels
        callbacks: {
          label: function (tooltipItem) {
            // Access the dataset and label information from the outer data object
            const dataset = tooltipItem.dataset;
            const dataIndex = tooltipItem.dataIndex;
            const label = data.labels[dataIndex]; // Accessing the label from the `data` object
            const value = dataset.data[dataIndex]; // Accessing the value from the `dataset`
            const total = dataset.data.reduce((sum, val) => sum + val, 0); // Total value of the dataset
            const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage

            return `Quantity of ${label} Disbursed: ${value} (${percentage}%)`; // Dynamic label showing the segment name and value
          },
        },

        position: 'nearest', // Keeps the tooltip near the hovered slice
        maxWidth: 250, // Increase the width limit of the tooltip
        padding: 10, // Increase padding inside the tooltip for better spacing
      },
    },
    cutout: '50%', // Optional: Add cutout for doughnut chart appearance
    radius: '80%',  //outer radius of pie graph
  };
  return (
    <div className=' p-1'>
      <Pie options={options} data={data}/>
   </div>
  )
}

export default Piegraph2
