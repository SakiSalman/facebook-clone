import mongoose from "mongoose";

const UserSchema = mongoose.Schema({


    fname : {
        type: String,
        trim : true
    },
    sname : {
        type : String,
        trim : true,
        required : true,
        minLength : 5
    },
    auth : {
        type : String,
        trim : true,
        required : true,
    },
    password : {
        type : String,
        trim : true,
        
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    photo : {
        type : String,
        trim : true,

    }
},{
    timestamps : true,
    version : false
})



// export Model

export default mongoose.model('Users', UserSchema)