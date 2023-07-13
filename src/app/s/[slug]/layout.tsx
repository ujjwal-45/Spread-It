import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'



const layout = async ({ children, params: { slug } }: { children: React.ReactNode , params: { slug: string }}) => {
    
    const session = await getAuthSession()

    const subreddit = await db.subreddit.findFirst({
        where: { name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                },
            },
        },
    })

    const subscription = !session?.user ? undefined : await db.subscription.findFirst({
        where: {
            subreddit: {
                name: slug,
            },
            user: {
                id: session.user.id,
            },
        },
    })

    const isSubscribed = !!subscription

    const memeberCount = await db.subscription.count({
        where: {
            subreddit: {
                name: slug,
            },
        },
    })

    if(!subreddit) return notFound()
    
    return (
        <div className='sm:container max-w-7xl mx-auto h-full pt-12'>
            <div>
                {/* todo button to take us back */}
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>

                    <div className='flex flex-col col-span-2 space-y-6'>{children}</div>
                    {/* info slider */}
                    <div className='hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200'>
                        <div className='px-6 py-4'>
                            <p className='font-semibold py-3'>About s/</p>
                        </div>

                        <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
                            <div className='flex justify-between gap-x-4 py-3'></div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default layout