import  promptModel  from "@models/PromptModel";
import { connectDb } from  "@utils/database";


export const POST = async (req) =>{
    const {search} = await req.json();
    try {
        await connectDb();
        // const searchPrompt = await promptModel.find({
         
        //     $or:[
        //         {prompt:{$regex:search,$options:'i'}},
        //         {tag:{$regex:search,$options:'i'}},
        //     ]
        // }).populate('creator');

        const regex = new RegExp(search, "i");
        const searchPrompt = await promptModel.find({}).populate('creator');
       const filtered =  searchPrompt.filter(
            (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        )
        if (!filtered) {
            return new Response('prompts not found',{status:404})
        }
        return new Response(JSON.stringify(filtered),{status:200})

    } catch (error) {
        return new Response(error.message,{cause:500})
    }
}









// const { connectDb } = require("@utils/database");
// import promptModel from "@models/PromptModel";


// export const GET = async(req) =>{
//     try {
//      await   connectDb();
//      const prompts = await promptModel.find({}).populate('creator')
//      return new Response(JSON.stringify(prompts),{status:200})
//     } catch (error) {
//      return new Response('fail to fetch all prompts',{status:500})
        
//     }
// }