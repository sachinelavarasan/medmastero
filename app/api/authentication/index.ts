import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
// import { handle } from 'hono/vercel';

import { login } from '@/app/api/authentication/controller';

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string(),
});

const authRoutes = new Hono();

authRoutes.post('/login', zValidator('form', loginSchema), login);

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
