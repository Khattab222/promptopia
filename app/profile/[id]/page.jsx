'use client'
import Profile from '@components/Profile'

import { useRouter,useSearchParams } from 'next/navigation'
import {useState,useEffect} from 'react'

const userProfile = ({params}) => {
    const SearchParams = useSearchParams();
    const router = useRouter()
    const [posts, setposts] = useState([])
    const username = SearchParams.get('name')
  
 
  
  
    //   fetch all posts 
      const fetchPosts = async() =>{
        const res = await fetch(`/api/users/${params.id}/posts`);
        const data = await res.json()
  
        setposts(data)
     
      }
    useEffect(() => {

     if(params.id) fetchPosts()
    
    }, [])
  return (
    <Profile
    name={username}
    desc={`welcome to ${username} profile`}
    data={posts}
    
    />
  )
}

export default userProfile