'use client'
import { authClient } from '@/lib/auth-client'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from '@/components/ui/form'
import { Alert,AlertTitle } from '@/components/ui/alert'
import { OctagonAlert } from 'lucide-react'

import { Card,CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name:z.string().min(1,{message:'Name is required'}),
  email:z.string().email(),
  password:z.string().min(1,{message:"Password is required"}),
  confirmpassword:z.string().min(1,{message:"Password is required"}),
}).refine((data)=> data.password===data.confirmpassword,{
  message:"Passwords don't match",
  path:["confirmpassword"]
})


export const SignUpView = () => {
  const router =useRouter();
  const [pending,setPending]=useState(false);
  const [error,setError]=useState<string| null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:"",
      email:"",
      password:"",
      confirmpassword:""
    }
  })
  const onSubmit= (data:z.infer<typeof formSchema>)=>{
    setError(null);
    setPending(true);
     authClient.signUp.email({
      name:data.name,
      email:data.email,
      password:data.password,
      
    },{
      onSuccess:()=>{
        setPending(false)
        router.push("/")
      },
      onError:({error})=>{
        setPending(false)
        setError(error.message);
      }
    }
  );

  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                    <h1 className='text-2xl font-bold'>
                      Let&apos;s get started
                    </h1>
                    <p className='text-muted-foreground text-balance'>
                      Created your accound
                    </p>
                </div>
                <div className='grid gap-3'>
                  <FormField
                  control={form.control}
                  name='name'
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>
                        Name
                      </FormLabel>
                       <FormControl>
                        <Input
                        type='name'
                        placeholder='Enter your Name' 
                        {...field}
                        />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                  
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                  control={form.control}
                  name='email'
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>
                       <FormControl>
                        <Input
                        type='email'
                        placeholder='Enter your email address' 
                        {...field}
                        />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                  
                  />
                </div>
                  <div className='grid gap-3'>
                  <FormField
                  control={form.control}
                  name='password'
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>
                        Password
                      </FormLabel>
                       <FormControl>
                        <Input
                        type='Password'
                        placeholder='Enter your  Password' 
                        {...field}
                        />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                  
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                  control={form.control}
                  name='confirmpassword'
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>
                       Confirm Password
                      </FormLabel>
                       <FormControl>
                        <Input
                        type='password'
                        placeholder='Enter your  Password' 
                        {...field}
                        />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                  
                  />
                </div>
                {!!error && (
                  <Alert className='bg-destructive/10 border-none'>
                  <OctagonAlert className='h-4 w-4 !text-destructive'/>
                  <AlertTitle>{error}</AlertTitle>
                </Alert>)}
                <Button disabled={pending} type='submit' className='w-full '>Sign Up</Button> 
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-card text-muted-foreground relative z-10 px-2'>
                    Or continue with
                  </span>
                </div>
                <div className='grid grid-cols-3'>
                  <Button disabled={pending} variant='outline' type='button' className='w-full'>
                    Google
                  </Button>
                  <Button disabled={pending} variant='outline' type='button' className='w-full'>
                    Github
                  </Button>
                  <Button disabled={pending} variant='outline' type='button' className='w-full'>
                    Apple
                  </Button>
                </div>  
                <div className='text-center text-sm'>
                  Already have an account?{" "} 
                  <Link href="/sign-in" className='underline underline-offset-4'>Sign In</Link>
                </div>
              </div>
            </form>
          </Form>
          <div className='bg-radial from-blue-100 to-gray-400 relative hidden md:flex flex-col gap-y-4 items-center justify-center'>
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              height={1900} 
              width={1900} 
            />
            
          </div>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
                  By clicking continue, you agree to our {" "} <a href="#">Terms of Service </a> and <a href="#">Privacy Policy</a>
      </div>
    </div>
  )
}
