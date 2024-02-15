import Link from 'next/link';
import Navbar from './_components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <h2 className="text-[30px] font-bold text-teal-600">MedMastero</h2>
      <div className="flex mx-2">
        <Link href="/login" className="mx-2">
          Login
        </Link>
        <Link href="/signup" className="mx-2">
          SignUp
        </Link>
      </div>
    </main>
  );
}
