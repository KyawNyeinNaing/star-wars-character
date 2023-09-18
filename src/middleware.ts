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
  } else {
    return 'guest';
  }
};

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const getAll = req.cookies.getAll()
  const token = getAll[0]?.value;
  const userStatus = getUserStatus(token);
  const requiredStatus = getRequiredStatus(pathname);

  // if (userStatus !== requiredStatus) {
  //   req.nextUrl.pathname = '/'
  //   return NextResponse.redirect(req.nextUrl)
  // } else {
  //   req.nextUrl.pathname = '/login'
  //   return NextResponse.redirect(req.nextUrl)
  // }

  // if (userStatus !== requiredStatus) {
  //   if (userStatus === 'guest') {
  //     return NextResponse.redirect('/login');
  //   } else {
  //     console.log('error')
  //   }
  // } else {

  // }
};
