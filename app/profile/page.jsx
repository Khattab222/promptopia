'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {useState,useEffect} from 'react'


const myProfile = () => {
  const {data:session} = useSession()
  const [posts, setposts] = useState([])

  const handleEdit = () =>{
    
  }
  const handleDelete = async() =>{

  }


    // fetch all posts 
    const fetchPosts = async() =>{
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json()
      console.log(data);
      setposts(data)
   
    }
  useEffect(() => {
    
   
   if(session?.user.id) fetchPosts()
  
  }, [])
  return (
   <Profile
   name='my'
   desc='welcome to your personal profile'
   data={posts}
   handleEdit = {handleEdit}
   handleDelete = {handleDelete}
   
   />
  )
}

export default myProfile