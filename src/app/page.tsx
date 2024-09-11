import Data from '@/components/datas/datas';
import Menu from '@/components/menu/menu';

export default function Home() {
  return (
    <main className='flex flex-col h-screen'>
      <div className='flex justify-center items-start p-2'>
        <Menu />
      </div>
      <div className='flex flex-grow justify-center items-center'>
        <Data />
      </div>
    </main>
  );
}
