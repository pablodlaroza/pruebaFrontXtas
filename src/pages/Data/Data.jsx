import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Data() {
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);
  const chartRefs = useRef([]);
  const jsonData = [
    {
      label: 'Gráfica 1',
      data: [10, 20, 30],
    },
    {
      label: 'Gráfica 2',
      data: [5, 15, 25],
    },
  ];

  useEffect(() => {
    const instances = jsonData.map((chartData, index) => {
      const ctx = document.getElementById(chartData.label).getContext('2d');

      // Destruye la instancia anterior si existe
      if (chartRefs.current[index]) {
        chartRefs.current[index].destroy();
      }

      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo'],
          datasets: [chartData],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    // Actualiza las referencias de las instancias de gráficos
    chartRefs.current = instances;
  }, [selectedChartIndex]);

  const handleExport = async (format) => {
    const selectedChart = chartRefs.current[selectedChartIndex];

    if (format === 'png' || format === 'jpeg') {
      const canvas = await html2canvas(selectedChart.canvas);
      const dataURL = canvas.toDataURL(`image/${format}`);
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = `grafica_${selectedChartIndex + 1}.${format}`;
      a.click();
    } else if (format === 'pdf') {
      const canvas = await html2canvas(selectedChart.canvas);
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 10, 10, 190, 100);
      pdf.save(`grafica_${selectedChartIndex + 1}.pdf`);
    }
  };

  return (
    <div>
      <div className="chart-selection">
        {jsonData.map((chartData, index) => (
          <button
            key={index}
            onClick={() => setSelectedChartIndex(index)}
            className={selectedChartIndex === index ? 'active' : ''}
          >
            {chartData.label}
          </button>
        ))}
      </div>
      <div>
        {jsonData.map((chartData, index) => (
          <div key={index} style={{ display: selectedChartIndex === index ? 'block' : 'none' }}>
            <canvas id={chartData.label}></canvas>
          </div>
        ))}
        <div className="export-buttons">
          <button onClick={() => handleExport('png')}>Exportar PNG</button>
          <button onClick={() => handleExport('jpeg')}>Exportar JPEG</button>
          <button onClick={() => handleExport('pdf')}>Exportar PDF</button>
        </div>
      </div>
    </div>
  );
}

export default Data;
