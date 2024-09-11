import { FiThermometer, FiCloudDrizzle } from 'react-icons/fi';

type Data = {
  id: number;
  temperature: string;
  humidity: string;
  created_at: string;
};

type DataResponse = {
  status: string;
  message: string;
  data: Data;
};

export default async function Data() {
  const response = await fetch(`http://localhost:3000/api/temperature/getLatest`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-store',
  });

  const data: DataResponse = await response.json();
  const data_json: Data = data.data;

  return (
    <ul className=' bg-base-200 p-10 rounded-box text-2xl space-y-2'>
      <li className='flex justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
        <FiThermometer className='text-xl' />
        <p>Temperatura: {data_json.temperature}</p>
      </li>

      <li className='flex justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
        <FiCloudDrizzle className='text-xl' />
        <p>Umidade: {data_json.humidity}%</p>
      </li>
    </ul>
  );
}
