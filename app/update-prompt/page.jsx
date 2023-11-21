"use client";
import Form from "@components/Form";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";

const updatePrompt = () => {
  const router = useRouter();
 
  const SearchParams = useSearchParams();
  const promptId = SearchParams.get('id');

  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });


  // fetch prompt data
  const fetchpromptdata = async () =>{
    const res = await fetch(`/api/prompt/${promptId}`);
    const data = await res.json();
    setPost({
      prompt: data.prompt,
    tag: data.tag,
    })
  }

  useEffect(() => {
    fetchpromptdata()
 
  }, [promptId])
  
 // update prompt
 const handleUpdatePrompt = async (e) => {
  e.preventDefault();
  setSubmitting(true);
 try {
  const res = await fetch(`/api/prompt/${promptId}`,{
    method:'PATCH',
    body:JSON.stringify({
      prompt: post.prompt,
      tag: post.tag,
    })
  });
  if (res.ok) {
    router.push('/')
  }
 } catch (error) {
  console.log(error);
 }finally{
  setSubmitting(false);

 }
 }

  return (
    <Form
      type="update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit= {handleUpdatePrompt}
    />
  );
};

export default updatePrompt;
