import NextAuth, { DefaultSession } from "next-auth"
import {User} from "@auth/core/types";

declare module "next-auth" {
    interface AppUser {
        email: string;
        image: string | null | undefined;
        token: string;
        username: string;
    }

    interface Session extends DefaultSession {
        accessToken: string
    }
}