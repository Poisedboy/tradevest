import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const handlers = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@mail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Email and password are required');
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					throw new Error('User not found');
				}

				const isValidPassword = await bcrypt.compare(
					credentials.password,
					user.password || '',
				);

				if (!isValidPassword) {
					throw new Error('Invalid password');
				}

				return { id: user.id, email: user.email };
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async session({ session, token }) {
			session.user.id = token.sub;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});
