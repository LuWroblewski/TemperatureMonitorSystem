import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Menu from '@/components/menu/menu';

export const metadata: Metadata = {
  title: 'Temperatura e Umidade',
  description: 'Mostra a temperatura e Umidade do quarto.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <SpeedInsights />
      <Analytics />
      <body>
        <div className='flex justify-center items-start p-2 '>
          <Menu />
        </div>
        {children}
      </body>
    </html>
  );
}
