import { adminPostLogin } from '@/app/admin/(functions)/functions';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
    interface Session {
        _id: string;
        Email: string
        Password: string
    }

    interface User {
        _id: string;
        Email: string
        Password: string
    }

    interface JWT {
        _id: string;
        Email: string
        Password: string
    }
}

const AUTHENTICATION = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { data, status } = await adminPostLogin({
                        Email: credentials?.email + "",
                        Password: credentials?.password + ""
                    });
                    if (status && data) {
                        return {
                            _id: data._id,
                            id: data._id,
                            Email: data.Email,
                            Password: data.Password
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error in login:", error);
                    return null;
                }
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.id = user.id;
                token.Email = user.Email;
                token.Password = user.Password
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session._id = token._id as string;
                session.Email = token.Email as string;
                session.Password = token.Password as string
            }
            return session;
        },
    },
});

export { AUTHENTICATION as GET, AUTHENTICATION as POST };
