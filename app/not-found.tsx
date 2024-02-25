import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-[30px]">404 | Page not found</h2>
        <p className="space-y-4">Could not find requested resource</p>
        <Link
          href="/"
          className="p-3 my-5 dark:bg-[#FFFFFF] bg-app_dark_bg rounded-md text-[#FFFFFF] dark:text-app_dark_bg font-semibold">
          Return Home
        </Link>
      </div>
    </div>
  );
}
