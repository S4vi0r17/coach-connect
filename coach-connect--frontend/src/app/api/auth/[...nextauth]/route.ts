import axiosClient from '@/config/axios.config';
import { isAxiosError } from 'axios';
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
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials');
          throw new Error('Email and password are required');
        }

        try {
          const { data, status } = await axiosClient.post<LoginResponse>(
            '/coach/login',
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
        } catch (error) {
          console.log('❌ Login error:');

          if (isAxiosError(error)) {
            console.log('  - Message:', error.message);
            console.log('  - Status:', error.response?.status);
            console.log('  - Status Text:', error.response?.statusText);
            console.log('  - Response Data:', error.response?.data);

            const errorData = error.response?.data;
            let errorMessage = 'Login failed';

            if (errorData) {
              if (typeof errorData === 'string') {
                errorMessage = errorData;
              } else if (errorData.message) {
                errorMessage = errorData.message;
              } else if (errorData.error) {
                errorMessage = errorData.error;
              }
            }

            throw new Error(errorMessage);
          }

          // Para errores que no son de Axios
          console.log('  - Unknown error:', error);
          throw new Error('An unexpected error occurred');
        }
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
