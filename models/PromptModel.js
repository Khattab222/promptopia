import {Schema,models,model} from 'mongoose'

const promptShema = new Schema({
    creator : {type: Schema.Types.ObjectId,ref:'User'},
    prompt:{
        type:String,
        required:[true,'prompt is required']
    },
    tag:{
        type:String,
        required:[true,'tag is required']
    }
});


const promptModel = models.Prompt || model('Prompt',promptShema)

export default promptModel