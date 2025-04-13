import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RevenueDistributionProps {
  data: {
    name: string;
    value: number;
  }[];
}

const RevenueDistributionChart: React.FC<RevenueDistributionProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(56, 178, 172, 0.8)',
          'rgba(72, 187, 120, 0.8)',
          'rgba(109, 40, 217, 0.8)'
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(56, 178, 172, 1)',
          'rgba(72, 187, 120, 1)',
          'rgba(109, 40, 217, 1)'
        ],
        borderWidth: 2,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: 500
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1F2937',
        bodyColor: '#4F46E5',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: 600
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: 500
        },
        padding: 12,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: TooltipItem<'doughnut'>) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = Math.round((value * 100) / total);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '20px' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default RevenueDistributionChart;
