import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from "./db";
import { nanoid } from 'nanoid'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session:{
        strategy: 'jwt',

    },
    pages: {
        signIn: '/sign-in',
    },
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],

    callbacks: {
        async session({ token, session }){
            if(token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.username = token.username
    
            }
            return session
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where:{
                    email: token.email,
                },
            })

            if(!dbUser){
                token.id = user!.id
                return token
            }

            if(!dbUser.username) {
                await db.user.update({
                    where:{
                        id: dbUser.id,
                    },
                    data: {
                        username: nanoid(10),
                    }
                })
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username,
            }
        },
        redirect(){
            return '/'
        }
    },
}

export const getAuthSession = () => getServerSession(authOptions)