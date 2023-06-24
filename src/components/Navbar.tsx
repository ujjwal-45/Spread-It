import Link from 'next/link'
import React from 'react'
import { Icons } from './Icons'


const Navbar = () => {
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10]'>
        <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>

        </div>
        <Link href={'/'} className="flex p-2 items-center ">
        <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
        <p className='hidden text-zinc-700 text-sm font-medium md:block'>
            SpreadIt
        </p>
        
        </Link>
       
    </div>
  )
}

export default Navbar