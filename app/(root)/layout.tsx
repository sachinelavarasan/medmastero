import Link from 'next/link';

import Navbar from '../shared/Navbar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="w-full pt-[85px] min-h-screen">{children}</section>
    </main>
  );
}
