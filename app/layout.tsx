import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppNavigation from '@/components/app-navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vero - Authenticated Sports Memorabilia',
  description: 'Track authentic sports memorabilia from factory to field to fan with blockchain verification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppNavigation />
        {children}
      </body>
    </html>
  );
}