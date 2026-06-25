import mongoose from "mongoose";

const SentNotificationSchema = new mongoose.Schema({
    title:{
        type: String
    },
    message:{
        type: String
    },
    icon:{
        type: String
    },
    recipients:{
        type: [String]
    },
    date: {
        type: String
    }
});

const RecievedNotificationSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    title:{
        type: String
    },
    message:{
        type: String
    },
    date: {
        type: String
    },
    session_email: {
        type: String
    },
    session_status: {
        type: String
    }
});

const RecievedNotification = mongoose.model("RecievedNotification", RecievedNotificationSchema, "recieved-notifications");
const SentNotification = mongoose.model("SentNotification", SentNotificationSchema, "sent-notifications");

export { RecievedNotification, SentNotification };