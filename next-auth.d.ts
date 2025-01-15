import NextAuth, { type DefaultSession } from 'next-auth';

// added supabaseAccessToken 

export type ExtendedUser = DefaultSession["user"] & {
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
}; 

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
        supabaseAccessToken: string;
    }
}
