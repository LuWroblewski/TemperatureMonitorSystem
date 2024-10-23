type Stats = {
  min: number;
  max: number;
  median: number;
};

type DataResponse = {
  status: number;
  message: string;
  data: {
    temperature: Stats;
    humidity: Stats;
  };
};

export default async function MinMaxMedian() {
  const url_api = process.env.URL_API;

  const response = await fetch(`${url_api}/api/charts/minMaxMedian?startDate=2024-09-20&endDate=2024-09-30`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-cache',
  });

  const dataResponse: DataResponse = await response.json();
  const { temperature, humidity } = dataResponse.data;

  return (
    <div className='flex w-full flex-col lg:flex-row px-16'>
      <div className='card bg-base-300 rounded-box grid h-auto flex-grow place-items-center'>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>Media temperatura</p>
          <p className='justify-center items-center text-center mt-4 text-xl'> {temperature.median} ° </p>
        </div>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>Media umidade</p>
          <p className='justify-center items-center text-center mt-4 text-xl'> {humidity.median} % </p>
        </div>
      </div>

      <div className='divider lg:divider-horizontal'></div>

      <div className='card bg-base-300 rounded-box grid h-auto flex-grow place-items-center'>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>Minimo temperatura</p>
          <p className='justify-center items-center text-center mt-4 text-xl'> {temperature.min} ° </p>
        </div>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>Minimo umidade</p>
          <p className='justify-center items-center text-center mt-4 text-xl'> {humidity.min} % </p>
        </div>
      </div>

      <div className='divider lg:divider-horizontal'></div>

      <div className='card bg-base-300 rounded-box grid h-auto flex-grow place-items-center'>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>Maximo temperatura</p>
          <p className='justify-center items-center text-center mt-4 text-xl'> {temperature.max} ° </p>
        </div>
        <div className=' justify-center items-center space-x-2 hover:bg-neutral p-2 rounded-box'>
          <p className='flex text-3xl'>Maximo umidade</p>
          <p className='justify-center items-center text-center mt-4 text-xl'> {humidity.max} % </p>
        </div>
      </div>
    </div>
  );
}
