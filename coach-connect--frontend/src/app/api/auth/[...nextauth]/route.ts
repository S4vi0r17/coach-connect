import axiosClient from '@/config/axios.config';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface LoginResponse {
  id: string;
  fullName: string;
  email: string;
  access_token: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'm@example.com' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { data, status } = await axiosClient.post<LoginResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/coach/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        if (status !== 201) {
          return null;
        }

        const user = {
          id: data.id,
          name: data.fullName,
          email: data.email,
          accessToken: data.access_token,
        };

        console.log('User logged in:', user);

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('JWT callback - user:', user);
      // console.log('JWT callback - token:', token);
      // Solo la primera vez que el usuario inicia sesión
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Exponer el accessToken en la sesión
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
