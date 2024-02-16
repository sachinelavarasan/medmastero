import React from 'react';
import Link from 'next/link';

interface LinkProps {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  LinkText: string;
  className?: string;
}

const RedirectLink = ({ LinkText, className, ...props }: LinkProps) => {
  return (
    <Link {...props} className={`text-[#00BBA8] text-[12px] font-semibold ${className}`}>
      {LinkText}
    </Link>
  );
};

export default RedirectLink;
