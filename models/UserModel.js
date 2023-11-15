import { Schema,model, models } from "mongoose";

const userSchema = new Schema({

    email:{
        type:String,
        unique:[true,'Email already exists'],
        required:[true,'Email is required']
    },
    username:{
        type:String,
        required:[true,'Username is required'],
    },
    image:String
})

const userModel = models.User || model('User',userSchema);

export default userModel
