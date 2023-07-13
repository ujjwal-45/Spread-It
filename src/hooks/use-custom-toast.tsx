import { toast } from "@/hooks/use-toast";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

export const useCustomToast = () => {
    const loginToast = () => {
        const { dismiss } = toast({
            title: 'Login Required',
            description: 'You need to be logged in to create a subspreadit community',
            variant: 'destructive',
            action: (
                <Link href='/sign-in' onClick={() => dismiss()} className={buttonVariants({ variant: 'outline' })} >
                    Login
                </Link>
            ),
        })
        
    }

    return { loginToast }
}