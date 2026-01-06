import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/login',
  '/api/auth',
  '/api/cache',
  '/api/health',
  '/',
  '/middleware-demo',
  '/unauthorized',
];
const privateRoutes = [
  '/dashboard',
  '/contas',
  '/clientes',
  '/fornecedores',
  '/produtos',
  '/relatorios',
  '/configuracoes',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if route is private
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  // For private routes, check for session cookie
  if (isPrivateRoute) {
    // Look for any session cookie that might exist
    const cookies = request.cookies;
    const sessionCookieNames = [
      'authjs.session-token',
      '__Secure-authjs.session-token',
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
    ];

    const hasValidSession = sessionCookieNames.some((name) => {
      const cookie = cookies.get(name);
      return cookie && cookie.value && cookie.value.length > 10; // basic validity check
    });

    // If no valid session, redirect to login
    if (!hasValidSession) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If has session, allow access
    return NextResponse.next();
  }

  // For all other routes, allow access (will be handled by page-level auth)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
