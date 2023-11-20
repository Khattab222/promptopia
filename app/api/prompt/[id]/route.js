
const { connectDb } = require("@utils/database");
import promptModel from "@models/PromptModel";

// GET (read)
export const GET = async(req,{params}) =>{
    try {
     await   connectDb();
     const prompt = await promptModel.findById(params.id).populate('creator');
     if (!prompt) {
        return new Response('prompts not found',{status:404})
     }
     return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
     return new Response('fail to fetch all prompts',{status:500})
        
    }
}

// Patch (update)
export const PATCH = async (req,{params}) =>{
    const {prompt , tag} = await req.json();

    try {
        await connectDb();
        
        const existPrompt = await promptModel.findById(params.id);

        if (!existPrompt) {
            return new Response('invalid prompt id' , {status:404})
        }
        existPrompt.prompt = prompt;
        existPrompt.tag = tag;
        await existPrompt.save(); 

    } catch (error) {
     return new Response('fail to update prompt',{status:500})
        
    }
}

// DELETE (delete)
export  const DELETE = async (req,{params}) =>{
    try {
            await promptModel.findByIdAndRemove(params.id);
            return new Response('prompt deleted',{status:200})
    } catch (error) {
     return new Response('fail to remove',{status:500})
        
    }
}