import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { handle } from 'hono/vercel';
// import { zValidator } from '@hono/zod-validator';
// import { HTTPException } from 'hono/http-exception';

import userRoutes  from '../user';
import authRoutes  from '../authentication';

const app = new Hono().basePath('/api');

app.use(logger());

app.route('/user', userRoutes) // Handle /user 
app.route('/', authRoutes) // Handle /auth 


export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

