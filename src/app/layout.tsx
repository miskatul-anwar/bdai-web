import type { Metadata } from 'next';
import '@/app/globals.css';
import Navbar from '@/layouts/Navbar';
import Footer from '@/layouts/Footer';
export const metadata: Metadata = {
  title: 'BDAI',
  description:
    'BanglaDesh Sectoral Knowledge Graphs and Large Language Models for Artificial Intelligence-Driven Insights',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#ecf0f1] font-sans">
          <Navbar />
          <div className="pt-14">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
