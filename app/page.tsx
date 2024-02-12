import Link from 'next/link';
import Navbar from './_components/navbar';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <h2 className='text-[30px] font-bold text-teal-600'>MedMastero</h2>
      <div className='flex mx-2'>
        <Navbar />
        <Link href='/login' className='mx-2'>
          Login
        </Link>
        <Link href='/signup' className='mx-2'>
          SignUp
        </Link>
      </div>
    </main>
  );
}
