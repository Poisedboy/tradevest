import { Balance } from '@prisma/client';
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		id: string;
		firstName: string;
		lastName: string;
		balance?: Balance[];
	}
	interface Session {
		user: {
			id: string;
			firstName: string;
			lastName: string;
		} & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		firstName: string;
		lastName: string;
	}
}
