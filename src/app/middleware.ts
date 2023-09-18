import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const getUserStatus = (token: string) => {
  if (token) {
    return 'admin';
  } else {
    return 'guest';
  }
};

const getRequiredStatus = (pathname: string) => {
  if (pathname === '/admin') {
    return 'admin';
  } else if (pathname === '/profile') {
    return 'user';
  } else {
    return 'guest';
  }
};

export const middleware = (req: NextRequest) => {
  console.log(req);
  const token = req.cookies.token;
  const userStatus = getUserStatus(token);
  const requiredStatus = getRequiredStatus(req.nextUrl.pathname);

  if (userStatus !== requiredStatus) {
    if (userStatus === 'guest') {
      return NextResponse.redirect('/login');
    } else {
      return NextResponse.redirect('/error');
    }
  }
};
