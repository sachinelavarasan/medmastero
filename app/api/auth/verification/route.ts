import { db } from '@/database';
import { user } from '@/database/schema';
import { sendResetPasswordEmail } from '@/utils/email';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request, response: any) {
  const { searchParams } = new URL(request.url);
  let email = searchParams.get('email') || '';

  if (!email) {
    return NextResponse.json({ error: 'Enter a valid email' }, { status: 400 });
  }

  try {
    const existingUser = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.us_email, email),
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    if (existingUser) {
      let reset_pass = crypto.randomUUID();

      const updatedUserId: { updatedId: number }[] = await db
        .update(user)
        .set({ us_verification_code: reset_pass })
        .where(eq(user.us_id, existingUser.us_id))
        .returning({ updatedId: user.us_id });

      console.log(updatedUserId);
      await sendResetPasswordEmail({
        email: existingUser.us_email || '',
        name: existingUser.us_fullname || '',
        reset_link: `${process.env.API_ENDPOINT}/reset-password?token=${reset_pass}`,
      });
    }

    return NextResponse.json(
      { response: 'Reset password email sended successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
