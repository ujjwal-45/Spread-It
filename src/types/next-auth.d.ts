import type { Session, User } from "next-auth";

import type { JWT } from "next-auth/jwt";

type USerId = string

declare module 'next-auth/jwt'{
    interface JWT{
        id: USerId
        username?: string | null
    }
}

declare module 'next-auth'{
    interface Session{
        user: User & {
            id: USerId
            username?: string | null
        }
       
    }
}