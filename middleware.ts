import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from './middlewares/api/authMiddleware';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!authMiddleware(request)) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:path*'],
};