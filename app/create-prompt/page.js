"use client";
import Form from "@components/Form";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const createPrompt = () => {
  const router = useRouter();
  const {data:session} = useSession()

  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createNewPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }finally{
    setSubmitting(false)

    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createNewPrompt}
    />
  );
};

export default createPrompt;
