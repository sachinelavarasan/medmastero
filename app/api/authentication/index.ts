import { Hono } from 'hono';
// import { handle } from 'hono/vercel';

import { login } from '@/app/api/authentication/controller';


const authRoutes = new Hono();

authRoutes.post('/login', login);

// authRoutes.get('/index/movies', (c) => {
//   return c.json({
//     movies: [
//       {
//         title: 'Movie 1',
//         year: 2021,
//       },
//     ],
//   });
// });

export default authRoutes;

