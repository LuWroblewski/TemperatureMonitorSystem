import { FiHome, FiBarChart2 } from 'react-icons/fi';

export default function Menu() {
  return (
    <ul className='menu bg-base-200 lg:menu-horizontal rounded-box'>
      <li>
        <a>
          <FiHome className='text-xl' />
          Medições
        </a>
      </li>
      <li>
        <a>
          <FiBarChart2 className='text-xl' />
          Gráficos
        </a>
      </li>
    </ul>
  );
}
