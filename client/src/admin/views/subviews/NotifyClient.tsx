import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { addSentNotification } from '../../../redux/admin/adminSlice';

const date = Date.now();

const schema = z.object({
  recipients: z.string(),
  icon: z.enum(['warning', 'success', 'error'],{
    errorMap: () => ({
      message: "Icon value must either be success, warning or error"
    })
  }), 
  title: z.string().min(5, { message: 'phone number invalid' }).max(40),
  message: z.string()
  .min(20,  { message: 'text should not be less than 20 characters' })
  .max(500,  { message: 'text should not be more than 500 characters' }),
});

type FormFields = z.infer<typeof schema>;

export default function NotifyClient() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

   const [inputLength, setinputLength] = useState(0);
          const inputText = watch('message', '');
          useEffect(()=>{
            setinputLength(inputText.length);
          },[inputText])
  const dispatch = useDispatch();
  
  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    axios
    .post('/api/notifications/out', {...data,date:date})
    .then(() => {
          dispatch(addSentNotification({...data, date:date}));
          toast.success('Notification Sent');  
    })
    .catch(() => {
      setError('root', { message: "An error Occurred" });
     toast.error("An error Occurred");
    })
  }
  return (
    <div>
      <div className="notify-form">
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
       <div className="col-lg-6">
        <TextField
            label="Recipient"
            placeholder='for multiple use comma for seperation'
            fullWidth
            margin="normal"
            {...register("recipients")}
            error={!!errors.recipients}
            helperText={errors.recipients?.message}
          />
          </div>
          <div className="col-lg-6">
           <TextField
            label="Icon"
            placeholder='warning, success or error'
            fullWidth
            margin="normal"
            {...register("icon")}
            error={!!errors.icon}
            helperText={errors.icon?.message}
          />
        </div>
     <div className="col-12">
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
       </div>
       <div className="col-12">
        <div className='d-flex justify-content-end'> 
          <span className="text-muted small">{inputLength} / 500</span>
        </div>
       <Controller 
         name='message'
         control={control}
         render={({ field }) => (
          <TextField
          {...field}
            label="Message"
            fullWidth
            multiline
            rows={5}
            {...register("message")}
            error={!!errors.message}
            helperText={errors.message?.message}
            onChange={(e) => {
            field.onChange(e); setinputLength(e.target.value.length);       
            }}
          />
         )}
       />
    </div>
    <div className="col-4">
          <button type="submit" className="btn btn-customx mt-3 py-2 px-4" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Confirm'}
            </button> 
    </div>
        </div>
        </form>
        </div>
    </div>
  )
}
