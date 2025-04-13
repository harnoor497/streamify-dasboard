import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, TooltipItem, ChartOptions } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface UserGrowthChartProps {
  data: {
    month: string;
    totalUsers: number;
    activeUsers: number;
    totalStreams: number;
    revenue: number;
  }[];
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Total Users',
        data: data.map(item => item.totalUsers),
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderColor: '#4F46E5',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4F46E5',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4F46E5',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Active Users',
        data: data.map(item => item.activeUsers),
        fill: true,
        backgroundColor: 'rgba(56, 178, 172, 0.1)',
        borderColor: '#38B2AC',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#38B2AC',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#38B2AC',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      }
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
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
      title: {
        display: false
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
        displayColors: true,
        callbacks: {
          label: function(context: TooltipItem<"line">) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} users`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6B7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.06)',
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6B7280',
          callback: function(tickValue: string | number) {
            return typeof tickValue === 'number' ? tickValue.toLocaleString() : tickValue;
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '20px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default UserGrowthChart; 