import MiniCreatePost from '@/components/MiniCreatePost';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';


interface pageProps {
    params: {
      slug: string
  }
}

const page = async ({ params }: pageProps) => {

    const { slug } = params;

    const session = await getAuthSession();

    const subreddit = await db.subreddit.findFirst({
        where: { name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    subreddit: true,
                },

                take: INFINITE_SCROLLING_PAGINATION_RESULTS,
            },
        },
    })

    if (!subreddit) return notFound();

    return (
        <>
            <h1 className='text-3xl font-bold md:text-4xl h-14'>
                s/{subreddit.name}
            </h1>
            <MiniCreatePost session={session} />
        </>
    )
}

export default page