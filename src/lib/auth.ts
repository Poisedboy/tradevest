import NextAuth, { Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { JWT } from 'next-auth/jwt';

export const authOptions = {
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
					include: {
						balance: true,
					},
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
				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: JWT; user: User }) {
			if (user) {
				token.id = user.id;
				token.firstName = user.firstName;
				token.lastName = user.lastName;
				token.balance = user.balance;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: User }) {
			session.user.id = token.id;
			session.user.firstName = token.firstName;
			session.user.lastName = token.lastName;
			session.user.name = `${token.firstName} ${token.lastName}`;
			session.user.balance = token.balance;
			return session;
		},
	},
	session: {
		strategy: 'jwt' as const,
		maxAge: 60 * 60 * 24, // 1 day
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export const handlers = NextAuth(authOptions);
