'use client'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/DropdownMenu'
import UserAvatar from './UserAvatar'

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {
  return (<DropdownMenu>
    <DropdownMenuTrigger>
      <UserAvatar className='h-8 w-8' user={{
        name: user.name || null,
        image: user.image || null,
      }} />
    </DropdownMenuTrigger>

    <DropdownMenuContent className='bg-white' align='end'>
      <div className='flex items-center justify-start gap-2'>
        <div className='flex flex-col space-y-1 leading-none'>
             {user.name && <p className='font-medium pl-1 pt-1'>{user.name}</p>}
             {user.email && <p className='w-[200px] truncate text-sm pl-1 text-zinc-700'>{user.email}</p>}
            
        </div>
      </div>

      <DropdownMenuSeparator></DropdownMenuSeparator>

      <DropdownMenuItem asChild>
        <Link href='/s/create'>Feed</Link>

      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href='/s/create'>Create Community</Link>

      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href='/settings'>Settings</Link>

      </DropdownMenuItem>

      <DropdownMenuSeparator></DropdownMenuSeparator>

      <DropdownMenuItem onSelect={(event) =>{
        event.preventDefault()
        signOut({ callbackUrl: `${window.location.origin}/sign-in`})
      }}
      className='cursor-pointer' >
      Sign Out

      </DropdownMenuItem>


    </DropdownMenuContent>

  </DropdownMenu>
  )
}

export default UserAccountNav