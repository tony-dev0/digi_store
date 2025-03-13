import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    value:{
        type: Number,
        required:true
    },
    percent:{
        type: Number
    },
    percentdesc:{
        type: String
    }
});

export default mongoose.model("Content", ContentSchema)