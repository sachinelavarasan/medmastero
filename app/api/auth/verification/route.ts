import { db } from '@/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request, response: any) {
  const { searchParams } = new URL(request.url);
  let email = searchParams.get('email') || '';

  if (!email) {
    return NextResponse.json({ error: 'Enter a valid email' }, { status: 400 });
  }

  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.us_email, email),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    return NextResponse.json({ email: user.us_email }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
