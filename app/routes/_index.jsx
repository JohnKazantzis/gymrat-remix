import NavigationBar from '../components/NavigationBar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Attendance',
    },
  },
};

const labels = ['Workouts Logged'];

export const data = {
  labels,
  datasets: [
    {
      label: 'You',
      data: labels.map(() => 350),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Average GymRat',
      data: labels.map(() => 250),
      backgroundColor: 'rgba(0, 116, 255, 0.8)',
    }
  ],
};

export default function Index() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className='w-4/5 m-auto flex flex-row'>
        <div className='w-2/4'>
          <Bar options={options} data={data} />;
        </div>
        <div className='w-2/4'>
          <Bar options={options} data={data} />;
        </div>
      </div>
    </>

  );
}

