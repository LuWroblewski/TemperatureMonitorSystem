import Link from 'next/link';
import { FiHome, FiBarChart2 } from 'react-icons/fi';

export default function Menu() {
  return (
    <ul className='menu bg-base-200 menu-horizontal rounded-box'>
      <li>
        <Link href='/'>
          <FiHome className='text-xl' />
          Medições
        </Link>
      </li>
      <li>
        <Link href='/charts'>
          <FiBarChart2 className='text-xl' />
          Gráficos
        </Link>
      </li>
    </ul>
  );
}
