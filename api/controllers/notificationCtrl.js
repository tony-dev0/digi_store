import { RecievedNotification, SentNotification} from "../models/Notification.js";

// get all recieved notifications
export const getRevNotifications = async (req, res, next) => {
    try {
        const revmsg = await RecievedNotification.find();
        
        res.status(200).json(revmsg);
       
      } catch (err) {
        next(err);
    }
  }

  // find and delete a recieved notification
  export const deleteRevNotification = async (req, res, next) => {
    try {
       const deletedNotification = await RecievedNotification.findByIdAndDelete(req.params.id);
        res.status(200).json(`Notification: (${deletedNotification._id}) has been deleted`);
        //reomve the const deletedUser edit this to return true 
        // so that you can confirm before dispatching an event in client side
    } catch (err) {
        next(err);
    }
 }

 // store notification send by user
 export const storeRevNotification = async (req, res, next) => {
    try {
        const newRevNotification = new RecievedNotification({
            name: String(req.body.name),
            email: String(req.body.email),
            title: String(req.body.title),
            message: String(req.body.message),
            session_email: String(req.body.semail),
            session_status: String(req.body.sstatus),
            date: String(req.body.date)
        })
             await newRevNotification.save();
             res.status(200).json('Messaged delivered Succesfully'); 
           }
    catch (err) {
        console.log("Err saving to db ", err);
        next(err);
    }
 }

// get all sent notifications
export const getSentNotifications = async (req, res, next) => {
    try {
        const sentmsg = await SentNotification.find();
        res.status(200).json(sentmsg);
      } catch (err) {
        next(err);
    }
  }
// get specific notification for a user
  export const getSpecificNotifications = async (req, res, next) => {
    const email = req.params.email;
    try {
        const spcmsg = await SentNotification.find({ recipients: email});
        if (spcmsg.length > 0) {
          res.status(200).json(spcmsg);
        }
        else {
          res.status(200).json(false);
        }
      } catch (err) {
        next(err);
    }
  }

 // store notification send by user
 export const storeSentNotification = async (req, res, next) => {
    let r = req.body.recipients;
    console.log(r);
     r = r.replaceAll(" ","");
    let recipients = r.split(",");
    recipients = recipients.filter((rn)=> rn !== "");
    try {
        const newSentNotification = new SentNotification({
            title: String(req.body.title),
            message: String(req.body.message),
            icon: String(req.body.icon),
            recipients: recipients,
            date: String(req.body.date)
        })
             await newSentNotification.save();
             res.status(200).json('Messaged Sent Succesfully'); 
           }
    catch (err) {
        console.log("Err saving to db ", err);
        next(err);
    }
 }

  // find and delete a recieved notification
  export const deleteSentNotification = async (req, res, next) => {
    try {
       const deletedNotification = await SentNotification.findByIdAndDelete(req.params.id);
        res.status(200).json(`Notification: (${deletedNotification._id}) has been deleted`);
        //reomve the const deletedUser edit this to return true 
        // so that you can confirm before dispatching an event in client side
    } catch (err) {
        next(err);
    }
 }

// update a user
export const removeRecipient = async (req, res, next) => {
    try {
        const data = await SentNotification.findById(req.params.id);
        if (!data) throw new Error("record not found");
        const recipients = data.recipients.filter((rn)=> rn !== req.body.email);
        //console.log(recipients); // outputs correctly
        const updatedData = await SentNotification.findByIdAndUpdate(
          req.params.id,
          { $set: {title: data.title, icon: data.icon, message: data.message, recipients: recipients, date: data.date} },
          { new: true }
        );
        res.status(200).json(updatedData);
      } catch (err) { 
        next(err);
}}