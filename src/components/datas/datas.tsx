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
  const url_api = process.env.URL_API;

  const response = await fetch(`${url_api}/api/temperature/getLatest`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-cache',
  });

  const data: DataResponse = await response.json();
  const data_json: Data = data.data;

  return (
    <div className='flex w-full flex-col lg:flex-row px-16'>
      <div className='card bg-base-300 rounded-box grid h-32 flex-grow place-items-center'>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>
            <FiThermometer className='mr-4' /> Temperatura
          </p>
          <p className='justify-center items-center text-center mt-4 text-xl'>{data_json.temperature} ° </p>
        </div>
      </div>
      <div className='divider lg:divider-horizontal'></div>
      <div className='card bg-base-300 rounded-box grid h-32 flex-grow place-items-center'>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>
            <FiCloudDrizzle className='mr-4' /> Umidade
          </p>
          <p className='justify-center items-center text-center mt-4 text-xl'>{data_json.humidity} % </p>
        </div>
      </div>
    </div>
  );
}
