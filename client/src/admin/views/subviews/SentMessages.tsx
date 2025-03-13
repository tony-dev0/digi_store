import { Delete } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import Fab from '@mui/material/Fab'
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { dateFormat, timeDifference } from '../../../page/timeFunction';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSentNotification, removeRecipient } from '../../../redux/admin/adminSlice';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.5px solid #000",
  boxShadow: 24,
  p: 4,
};

const CloseBadge:any = styled(Badge)
  `& .${badgeClasses.badge} {
    background: #ed425a;
  }`;

export default function SentMessages() {
  const dispatch = useDispatch();

  const { sent_notifications } = useSelector((state:any) => state.admin);
  const [id, setID] = useState<any>("");
  const [open, setOpen] = useState(false);
  const handleOpen = (event:any) => {
  setID(event.currentTarget.getAttribute('msg-id'));
  setOpen(true);
}
const [loading, setLoading] = useState(false);
    const handleClose = () => setOpen(false);   

    const handleClick = (event:any) => {
    const recipientid = event.currentTarget.getAttribute("rn-id");
    const email = event.currentTarget.getAttribute("rn-email");
    const obj = {
      id: recipientid,
      email: email
    }
    axios.put(`/api/notifications/out/${recipientid}`, obj).then(()=>{
      dispatch(removeRecipient(obj));
      toast.success("Action Confirmed. recipient will no longer see this notification");
    }).catch(() => {
      toast.error("an error occurred");
    })
}

    const handleSubmit = async () => { 
      setLoading(true);  
      setTimeout(async () => {
        axios.delete(`/api/notifications/out/${id}`).then(() => {
          dispatch(deleteSentNotification(id));
          setOpen(false);
          toast.success("Message deleted successfully");
      }).catch((err) => {
        toast.error("An error occured"); 
        console.log(err);
        setOpen(false);
        return;
      })    
        setLoading(false);
      }, 2000);
    };

  return (
    <div>
    <div className="row">
     {sent_notifications.map((rn:sent_notifications)=> {
      return <div className="mb-4 col-lg-6">
      <div className='revmsgbox'>
      <Fab
      msg-id={rn._id}
      sx={{
        '&:hover':{
        backgroundColor:"#c33",
        opacity:0.8,
        },
        zIndex:1,
        position: "absolute",
        top: 6,
        right: 15,
        width: 35,
        height: 35,
        backgroundColor:"#c33",
        color:"white"
      }}
      onClick={handleOpen}
    >
      <Delete/>
    </Fab>
        <p>Title: {rn.title}</p>
        <p>Icon: {rn.icon}</p>
        <p>Message </p>
        <div className='msgbox'>{rn.message}</div>
        <div className="msg-footer">
        {rn.recipients.map((email)=>{
          return <div className="recipients-wrapper"> 
          <div className="mx-2 recipients px-2 py-2 my-1">
            <div className="rnbadge" rn-email={email} rn-id={rn._id} onClick={handleClick}> 
                <CloseBadge badgeContent={<CloseIcon sx={{fontSize:'10px'}} />} color="primary" overlap="circular" />
              </div>
              <div className="reecipients-box">
                    {email}
              </div>
          </div>
          </div>
          })}
        </div>
       <div className="content-footer-body">
          <small className="text-muted">{dateFormat(rn.date)}</small>
          <small className="text-muted">{timeDifference(rn.date)}</small>
        </div>
      </div>
    </div>
     })}
    </div>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Action!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete ({id}) message.
          </Typography>
          <div className="mt-3 flex">
          <button className='mt-2 py-2 px-4 btn btn-secondary me-3' onClick={handleClose}>Cancel</button>
             <button className='mt-2 py-2 px-4 btn btn-danger' onClick={handleSubmit}>
             {loading ? (
                  <CircularProgress size={15} sx={{ color: "#fff", marginRight:'10px' }} />
                ) : (
                  ""
                )}
              Confirm Delete
              </button>
          </div>
        </Box>
      </Modal>
  </div>
  )
}
