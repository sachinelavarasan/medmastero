'use client';

import { useUserStore } from '@/lib/stores/user-store';
import React from 'react';

function Admin() {
  const { currentUser } = useUserStore((state) => state);
  return (
    <div className="flex flex-col items-center gap-y-3">
      <h2> Welcome {currentUser?.us_fullname}</h2>
    </div>
  );
}

export default Admin;
