import { Context } from 'hono';
import { setCookie } from 'hono/cookie';
import { sign } from 'hono/jwt';

import bcrypt from 'bcrypt';

import { getUser } from '@/app/api/authentication/methods';

export const login = async (c: Context<any, any, {}>) => {
  try {
    const bodyData: { email: string; password: string } = await c.req.parseBody();
    console.log('BODY DATA --------------------------------', bodyData);
    const { email, password } = bodyData;
    const data: any = await getUser(email);
    if (!data) {
      return c.json(
        {
          message: 'User Not found',
        },
        404,
      );
    }
    if (data && data.us_password) {
      const passwordsMatch = await bcrypt.compare(password, data.us_password);
      if (!passwordsMatch) {
        return c.json(
          {
            message: 'Invalid password',
          },
          401,
        );
      }
    }

    const payload = {
      data,
      exp: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    };

    const token = await sign(payload, process.env.AUTH_SECRET!);
    setCookie(c, 'token', token, {
      path: '/',
      secure: true,
      domain: 'localhost',
      httpOnly: true,
      expires: payload.exp,
    });
    return c.json(data);
  } catch (error: any) {
    console.log(error);
    return c.json({ error, message: error.message });
  }
};
