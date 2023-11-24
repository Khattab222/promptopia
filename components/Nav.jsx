'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'


const Nav = () => {
 
  
  const {data:session} = useSession()


  const [providers, setProviders] = useState(null)
  const [toggleDropdown, settoggleDropdown] = useState(false)
  useEffect(() => {
    const setUpproviders = async () =>{
      const response = await getProviders()
      setProviders(response)
     
      
    }
  
    setUpproviders()
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
  session?.user? (<div className='flex gap-3 md:gap-5'>
   
      <Link href='/create-prompt'
      className='black_btn'
      >
      Create Post
      </Link>
      <button className='font-inter outline_btn ' onClick={() =>signOut()} >SignOut</button>
      <Link href='/profile'>
      <Image
      src={session?.user.image}
      width={40}
      height={40}
      alt='progile'
      className=' rounded-full '
      />
      </Link>
  </div> ):(
    <>
   
   {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in with Google
                </button>
              ))}
    </>
  )
}
</div>

{/* mobile navigation */}
<div className='sm:hidden flex relative'>
{session?.user?(
  <div className='flex'>
    <Image
      src={session?.user.image}
      width={40}
      height={40}
      alt='progile'
      className=' rounded-full cursor-pointer '
      onClick={()=>settoggleDropdown((prev) =>!prev)}
      />
      {
        toggleDropdown && (
          <div className='dropdown rounded shadow-md' >
            <Link href='/profile'
            className='dropdown_link'
            onClick={() => settoggleDropdown(false)}
            >
            My Profile
            </Link>
            <Link href='/create-prompt'
            className='dropdown_link'
            onClick={() => settoggleDropdown(false)}
            >
            Create Prompt
            </Link>
            <button
            type='button'
            onClick={() =>{
              settoggleDropdown(false)
            signOut()
            }}
            className='w-full mt-3 black_btn'
            >
              Sign Out
            </button>
          </div>
        )
      }
  </div>
):(<>
  {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
</>)}
</div>
    </nav>
  )
}

export default Nav