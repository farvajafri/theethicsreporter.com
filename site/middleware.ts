import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redirect non-www to www with 301 permanent redirect
  if (host === 'theethicsreporter.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.theethicsreporter.com';
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and API routes
     * that don't need the redirect check
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
