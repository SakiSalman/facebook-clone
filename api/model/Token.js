import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({

    userid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,  
    },
    verifycode : {
            type : String,
            required : true
    }
    
},{
    timestamps : true,
    version : false
})



// export Model

export default mongoose.model('Token', TokenSchema)