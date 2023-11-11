'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'


const Nav = () => {
  let isUserLoggedIn = false
  const [providers, setProviders] = useState(null)
  useEffect(() => {
    const setproviders = async () =>{
      const response = await getProviders()
      setProviders(response)
    }
    setproviders()
  }, [])
  
  return (
    <nav className=' flex-between w-full mb-8 py-3 border  items-center'>
<Link href='/' className='flex gap-2 flex-center '>
  <Image src='/assets/images/logo.svg'
  alt='promptopia logo' 
   width={30}
   height={30}
   className='object-contain '
   />
   <p className='logo_text'>Promtopia</p>
</Link>

{/* desktop navigatin */}

<div className='sm:flex hidden'>
{
  isUserLoggedIn? (<div className='flex gap-3 md:gap-5'>
      <Link href='/create-prompt'
      className='black_btn'
      >
      Create Post
      </Link>
      <button className='outline_btn '>SignOut</button>
      <Link href='/profile'>
      <Image
      src="/assets/images/profile.png"
      width={40}
      height={40}
      alt='progile'
      className=' rounded-full '
      />
      </Link>
  </div> ):(
    <>
    {
      providers&&Object.values(providers).map((provider) =>{
        <button type='button'
        key={provider.name}
        onClick={() => signIn(provider.id)}
        className='black_btn'
        >
          SignIn
        </button>
      })
    }
    </>
  )
}
</div>

{/* mobile navigation */}
    </nav>
  )
}

export default Nav