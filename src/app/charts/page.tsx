import BoxplotChart from '@/components/charts/boxplotchart/boxplotchart';
import LineWithConfortLine from '@/components/charts/lineWithConfortLine/lineWithConfortLine';

export default function Home() {
  return (
    <main className='px-4'>
      <div className='bg-base-200 p-2'>
        <LineWithConfortLine />
        <BoxplotChart />
      </div>
    </main>
  );
}
