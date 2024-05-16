import { Hono } from 'hono';

import { middleware } from '@/app/api/authentication/methods';

import { fetchUser } from '@/app/api/user/controller';

const userRoutes = new Hono();

userRoutes.get('/:us_id', middleware, fetchUser);

export default userRoutes;
