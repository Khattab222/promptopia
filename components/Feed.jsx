'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText, setsearchText] = useState('')
  const [allposts, setAllPosts] = useState([])


  // fetch all posts 
  const fetchPosts = async() =>{
    const res = await fetch('/api/prompt');
    const data = await res.json()
    setAllPosts(data)
 
  }
useEffect(() => {
  
  
  fetchPosts()
}, [])

// handle fetch search 
const handleSearchFetch = async () =>{
  const res = await fetch(`/api/prompt/search`,{
    method: 'POST',
   
    body: JSON.stringify({search: searchText})
  })
  const data = await res.json()
  if (res.ok) {
    console.log(data)
    setAllPosts(data)
  }
}

  const handleSearchChange = (e) =>{
    e.preventDefault()
    setsearchText(e.target.value);
    handleSearchFetch()
  }


  const handleTagClick = () =>{

  }


  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' >
        <input type="text"
         placeholder='Search for a tag or prompt'
         value={searchText}
         onChange={handleSearchChange}
         required
         className='search_input peer font-satoshi'
        />
      </form>

      <PromptCardList
      data={allposts}
      handleTagClick={handleTagClick}
      
      />
    </section>
  )
}

export default Feed