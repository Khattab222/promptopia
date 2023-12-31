'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {useState,useEffect} from 'react'


const myProfile = () => {
  const {data:session} = useSession()
  const router = useRouter()
  const [posts, setposts] = useState([])

  const handleEdit = (post) =>{
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async(post) =>{
    try {
      await fetch(`/api/prompt/${post._id}`,{method:'DELETE'});
      const filteredPosts = posts.filter((p)=> p._id !== post._id);
      setposts(filteredPosts)
    } catch (error) {
      console.log(error)
    }
  }


    // fetch all posts 
    const fetchPosts = async() =>{
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json()
 
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