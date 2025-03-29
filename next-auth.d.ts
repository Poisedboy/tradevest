import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		id: string;
		firstName: string;
		lastName: string;
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
