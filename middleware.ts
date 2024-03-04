// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { authMiddleware } from './middlewares/api/authMiddleware';

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   if (!authMiddleware(request) && request.url.includes('/admin')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
//   if (!authMiddleware(request) && request.url.includes('/api')) {
//     return new NextResponse('Unauthorized', {
//       status: 401,
//     });
//   }

//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/api/:path*', '/admin/:path*'],
// };

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
