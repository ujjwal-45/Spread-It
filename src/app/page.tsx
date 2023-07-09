import { buttonVariants } from "@/components/ui/Button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-3xl border-2 border-sky-200 md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">

        {/* feed */}

        {/* {subreddit info} */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-teal-100 px-6 py-4">
            <p className="flex items-center py-1 gap-1.5 font-semibold">
              <HomeIcon />
              Home</p>
          </div>
  
          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-2">
              <p className="text-zinc-500">Browse your favorite spreadit communities.</p>
            </div>

            <Link href='/s/create' className={buttonVariants({
              className: 'w-full mt-4 mb-6'
            })}> Create Community
              
            </Link>

          </div>
        </div>

      </div>

  </div>
  )
}
