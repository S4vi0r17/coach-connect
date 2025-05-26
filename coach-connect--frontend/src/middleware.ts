import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

// Protege todas las rutas excepto las públicas
export const config = {
  matcher: [
    // Protege todo excepto login y API de auth
    // '/((?!login|api/auth).*)',
    '/dashboard',
  ],
};
