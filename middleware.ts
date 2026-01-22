import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers to prevent tampering
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com;",
};

function addSecurityHeaders(response: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if request is from localhost or allowed IPs
  const host = request.headers.get('host') || '';
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');

  // Allowed IPs for admin access
  const allowedIPs = ['223.190.82.17', '2401:4900:1c69:5754:5934:a1f0:d3a4:6549'];
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   request.headers.get('x-real-ip') ||
                   '';
  const isAllowedIP = allowedIPs.some(ip => clientIP.includes(ip));

  // Block access-denied page on localhost (it's only for production)
  if (pathname === '/access-denied' && isLocalhost) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow product pages with a valid handle (e.g., /product/desi-cow-ghee)
  if (pathname.startsWith('/product/') && pathname !== '/product/') {
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Block /product/ without a handle - redirect to access denied
  if (pathname === '/product' || pathname === '/product/') {
    if (isLocalhost) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }

  // Protect admin page - only allow on localhost or allowed IPs
  if (pathname.startsWith('/admin')) {
    if (!isLocalhost && !isAllowedIP) {
      return NextResponse.redirect(new URL('/access-denied', request.url));
    }
  }

  // Protect home page - only allow on localhost or allowed IPs
  if (pathname === '/') {
    if (!isLocalhost && !isAllowedIP) {
      return NextResponse.redirect(new URL('/access-denied', request.url));
    }
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

export const config = {
  matcher: ['/', '/admin/:path*', '/product', '/product/:path*', '/access-denied'],
};
