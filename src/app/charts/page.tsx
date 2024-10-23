import MinMaxMedian from '@/components/charts/minMaxMedian/minMaxMedian';
import LineWithConfortLine from '@/components/charts/lineWithConfortLine/lineWithConfortLine';

export default function Home() {
  return (
    <main className='px-4'>
      <MinMaxMedian />
      <div className='bg-base-200 p-2 mt-6'>
        <LineWithConfortLine />
      </div>
    </main>
  );
}
