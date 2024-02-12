import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen'>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h2 className='text-[30px]'>404 | Page not found</h2>
        <p className='space-y-4'>Could not find requested resource</p>
        <Link
          href='/'
          className='p-3 my-5 dark:bg-[#FFFFFF] bg-[#0C1615] rounded-md text-[#FFFFFF] dark:text-[#0C1615] font-semibold'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
