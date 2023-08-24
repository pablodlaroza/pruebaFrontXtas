import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

function Data() {
  const chartRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://pruebaxkape1.com.devel/api/plataforma/datos-graficas'
      );
      
      const jsonData = {
        labels: ['Total'],
        datasets: Object.keys(response.data).map((label, index) => ({
          label: label,
          data: [response.data[label].valor], // Asegúrate de acceder al valor correcto
          backgroundColor: getRandomColor(), // Función para obtener colores aleatorios
          borderColor: getRandomColor(),
          borderWidth: 1,
        })),
      };

      // Ahora tienes jsonData con los datos procesados de la API
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('chartCanvas').getContext('2d');

      const chartInstance = new Chart(ctx, {
        type: 'bar',
        data: jsonData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartRef.current = chartInstance;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExport = async (format) => {
    const selectedChart = chartRef.current;

    if (format === 'png' || format === 'jpeg') {
      const canvas = await html2canvas(selectedChart.canvas);
      const dataURL = canvas.toDataURL(`image/${format}`);
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = `grafica.${format}`;
      a.click();
    } else if (format === 'pdf') {
      const canvas = await html2canvas(selectedChart.canvas);
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 10, 10, 190, 100);
      pdf.save('grafica.pdf');
    }
  };

  return (
    <div>
      <div>
        <canvas id="chartCanvas"></canvas>
      </div>
      <div className="export-buttons">
        <button className='btnn' onClick={() => handleExport('png')}>Exportar PNG</button>
        <button className='btnn' onClick={() => handleExport('jpeg')}>Exportar JPEG</button>
        <button className='btnn' onClick={() => handleExport('pdf')}>Exportar PDF</button>
      </div>
    </div>
  );
}

// Función para obtener colores aleatorios en formato rgba
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
}

export default Data;
