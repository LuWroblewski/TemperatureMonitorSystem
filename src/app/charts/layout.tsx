import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Temperatura e Umidade',
  description: 'Mostra gráficos sobre a temperatura e Umidade do quarto.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
