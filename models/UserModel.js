import { Schema,model,Models } from "mongoose";

const userSchema = new Schema({

    email:{
        type:String,
        unique:[true,'Email already exists'],
        required:[true,'Email is required']
    },
    username:{
        type:String,
        required:[true,'Username is required'],
        match: [/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 5-20 alphanumeric letters and be unique!"]
    },
    image:String
})

const userModel = Models.User || model('User',userSchema);

export default userModel
