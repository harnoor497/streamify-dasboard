// src/components/Top5Songs.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TopSongsChartProps {
  data: {
    name: string;
    streams: number;
  }[];
}

const TopSongsChart: React.FC<TopSongsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Streams',
        data: data.map(item => item.streams),
        backgroundColor: 'rgba(72, 187, 120, 0.8)',
        borderColor: 'rgba(72, 187, 120, 1)',
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 20,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1F2937',
        bodyColor: '#48BB78',
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
          label: function(context: TooltipItem<"bar">) {
            return `${(context.parsed.x / 1000000).toFixed(1)}M streams`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6B7280',
          callback: function(tickValue: number | string) {
            const value = Number(tickValue);
            return `${(value / 1000000).toFixed(1)}M`;
          }
        }
      },
      y: {
        type: 'category',
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
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '20px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopSongsChart;
