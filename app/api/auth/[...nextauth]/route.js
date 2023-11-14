import NextAuth from "next-auth";
import { connectDb} from '@utils/database'
import GoogleProvider from 'next-auth/providers/google'
import userModel from "@models/UserModel";


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session ({session}){
        const sessionUser = await userModel.findOne({
            email:session.email
        })
        session.user.id = sessionUser._id.toString();

        return session
    },
    async signIn ({profile}){
        try {
            await connectDb()
//   check if user already exist 
            const userExist = await userModel.findOne({
                email:profile.email
            })


// if not create anew user
            if (!userExist) {
                await userModel.create({
                    email:profile.email,
                    username:profile.name.toLowerCase(),
                    image:profile.picture
                })
            }

            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }
})

export {handler as GET , handler as POST}