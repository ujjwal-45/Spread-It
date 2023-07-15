'use client'
import { cn } from '@/lib/utils'
import { FC, useState } from 'react'
import { Button } from './ui/Button'
import {signIn} from 'next-auth/react';
import { Icons } from './Icons';
import { useToast } from '@/hooks/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{}


const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props}) => {
   
    const {toast} = useToast()
   const [isLoading, setIsLoading] = useState<boolean>(false)
   

   const loginWithGoogle = async() =>{
     setIsLoading(true)
     
     try {
      
        await signIn('google')

    }catch (error){
      toast({
        title: 'There was a problem.',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })

    } finally{
        setIsLoading(false)
    }
   }


   const loginWithTwitter = async() =>{
    setIsLoading(true)
    try{
        await signIn('twitter')

    }catch (error){
        //toast notification
        toast({
            title: 'There was a problem.',
            description: 'There was an error logging in with Twitter',
            variant: 'destructive',
          })

    } finally{
        setIsLoading(false)
    }
   }

   const loginWithGithub = async() =>{
    setIsLoading(true)
    try{
        await signIn('github')

    }catch (error){
        //toast notification
        toast({
            title: 'There was a problem.',
            description: 'There was an error logging in with Github',
            variant: 'destructive',
          })

    } finally{
        setIsLoading(false)
    }
   }

  return (
  <div className={cn('flex flex-col gap-2 justify-center', className)}{...props}>
    <Button onClick={loginWithGoogle} isLoading={isLoading} size='sm' className='w-full'
    
    > {isLoading ? null : <Icons.google className='h-4 w-4 mr-2 ' />} Google</Button>


   <Button onClick={loginWithTwitter} isLoading={isLoading} size='sm' className='w-full gap-2'
    
    > {isLoading ? null : <Icons.TwitterIcon className='h-4 w-4 ' />} Twitter</Button>

   <Button onClick={loginWithGithub} isLoading={isLoading} size='sm' className='w-full gap-2'
    
    > {isLoading ? null : <Icons.GitHubIcon className='h-4 w-4 ' />} Github</Button>
  </div>
  )
}

export default UserAuthForm