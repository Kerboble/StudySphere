import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import axios from "axios"; // Import axios for data fetching

// Import necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph({refreshData}) {
    const [studentData, setStudentData] = useState([0]); // Initialize with initial value
    const [teacherData, setTeacherData] = useState([0]); // Initialize with initial value

  
    const options = {};
    const data = {
      labels: Array.from(
        { length: Math.max(studentData.length, teacherData.length) },
        (_, index) => index + 1
      ), // Generate labels dynamically
      datasets: [
        {
          label: "Students",
          data: studentData,
          borderColor: "rgb(75, 192, 192)"
        },
        {
          label: "Teachers",
          data: teacherData,
          borderColor: "rgb(100, 0, 100)"
        }
      ]
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:4000/users");
          const studentsCount = res.data.filter(user => user.role === "student").length;
          const teachersCount = res.data.filter(user => user.role === "teacher").length;
    
          // Update studentData and teacherData with new values
          setStudentData(prevData => [...prevData, studentsCount]); // Replace old data with new one
          setTeacherData(prevData => [...prevData, teachersCount]); // Replace old data with new one
        } catch (error) {
          console.error(error);
        }
      };
    
      // Fetch data initially
      fetchData();
    },  [refreshData]);


    
  
    return (
    <div className='graph'>
    <Line options={options} data={data} />
    </div>
    );
  }
  
  export default LineGraph;