import promptModel from "@models/PromptModel";
import { connectDb } from "@utils/database";





export const POST = async (req) =>{
    const {prompt,tag,userId} = await req.json();

    try {
        await connectDb();
        const newPrompt = new promptModel({
            creator:userId,
            prompt,
            tag
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status: 201})

    } catch (error) {
      return new Response('Failed to  create new prompt',{status:500})  
    }
}