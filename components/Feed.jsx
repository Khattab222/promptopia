'use client'
import React, { useEffect, useState } from 'react'

const Feed = () => {
  const [searchText, setsearchText] = useState('')
  const [posts, setposts] = useState([])
useEffect(() => {
  
  const fetchPosts = async() =>{
    const res = await fetch('./api/prompt');
    const data = await res.json()
    setposts(data)
  }
console.log(posts);
  fetchPosts()
}, [])


  const handleSearchChange = (e) =>{
    e.preventDefault()
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
         placeholder='Search for a tag or a username'
         value={searchText}
         onChange={handleSearchChange}
         required
         className='search_input peer font-satoshi'
        />
      </form>

      <PromptCardList
      data={[]}
      handleTagClick={handleTagClick}
      
      />
    </section>
  )
}

export default Feed