import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import "./history.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getNumbersFromArray(inputArray) {
  //Gets the numbers needed for the while array at every input.

  return inputArray.map(inputString => {
    const match = inputString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  });
}

const History = ({ location }) => {
  const today = new Date().getDay();
  const [currentDayIndex, setCurrentDayIndex] = useState(today);
  const currentDay = days[currentDayIndex];
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch("/api/history")
      .then(res => res.json())
      .then(data => {
        const formatChartData = (day) => {
          const chartData = []
          const labels = []
          const rawData = getNumbersFromArray(Object.values(data[day].LOCATIONS[location]))
          const reversedData = [...rawData].reverse();
          const firstNonZeroIndex = rawData.findIndex(value => value !== 0);
          const lastNonZeroIndex = rawData.length - 1 - reversedData.findIndex(value => value !== 0);
          console.log(firstNonZeroIndex)
          console.log(lastNonZeroIndex)
          rawData.forEach((value, index) => {
            if (index < firstNonZeroIndex || index > lastNonZeroIndex) {

            } 
            else if (value === 0) {
              chartData.push(null);
              labels.push(`${index + 6}:00`);
            } 
            else {
              chartData.push(value);
              labels.push(`${index + 6}:00`);
            }
          });
          
          return {
            labels: labels,
            datasets: [
              {
                data: chartData,
                backgroundColor: 'rgb(0, 48, 96)',
                borderColor: 'rgba(0, 48, 96, 0.2) ',        
              },
            ],
          };
        };
        setChartData({
          Monday: formatChartData('MONDAY'),
          Tuesday: formatChartData('TUESDAY'),
          Wednesday: formatChartData('WEDNESDAY'),
          Thursday: formatChartData('THURSDAY'),
          Friday: formatChartData('FRIDAY'),
          Saturday: formatChartData('SATURDAY'),
          Sunday: formatChartData('SUNDAY'),
        });
      });
  }, [location, currentDay]);

  const changeDay = (direction) => {
    let newIndex = (currentDayIndex + direction +days.length) % days.length;
    setCurrentDayIndex(newIndex);
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        title: {
          display: true,
          text: 'Capacity (%)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div>
      <div className = "spacer">
      {
        chartData[currentDay] ? <Line data={chartData[currentDay]} options={options} />
          : <p>Loading chart data...</p>
      }
      </div>
      <div className = "box">
        <button className= "button" onClick={() => changeDay(-1)}>←</button>
        <span >{currentDay}</span>
        <button className= "button" onClick={() => changeDay(1)}>→</button>
      </div>
    </div>
  );
}

export default History;