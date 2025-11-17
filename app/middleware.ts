export { auth as middleware } from '@/lib/auth'

export const config = {
  // Only protect /account routes, allow public access to home and other pages
  matcher: ['/account/:path*'],
}
