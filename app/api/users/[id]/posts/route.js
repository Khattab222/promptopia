const { connectDb } = require("@utils/database");
import promptModel from "@models/PromptModel";


export const GET = async(req,{params}) =>{
    try {
     await   connectDb();
     const prompts = await promptModel.find({creator:params.id}).populate('creator')
     return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
     return new Response('fail to fetch all prompts',{status:500})
        
    }
}