import { toast } from 'react-hot-toast';
import { Box, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, ChangeEvent, useRef, useState } from "react";
import { deleteProduct, updateProduct } from '../../../redux/admin/adminSlice';
import axios from "axios";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import ProductCardSkeleton from '../../components/ProductCardSkeleton';

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

const schema = z.object({
    name: z.string().min(10),
    units: z.string(),
    price: z.string(),
    category: z.string(),
    keyword: z.string(),
    type: z.string().min(3),
    description: z.string()
    .min(20,  { message: 'text should not be less than 20 characters' })
    .max(500,  { message: 'text should not be more than 500 characters' }),
  })

type FormFields = z.infer<typeof schema>

export default function ViewProduct() {
const dispatch = useDispatch();
const { products, productLoading } = useSelector((state:any) => state.admin);
const params = useParams();
const [active, setActive] = useState(0);
let specifiedProduct = products.find((product: { _id: any; }) => product._id === params.id);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mbLimit = 8 * 1024 * 1024;

  const [imageFile1, setImageFile1] = useState<File | null>(null);
  // const [imageFile1, setImageFile1] = useState<File | null>(null);
  const [imageFile2, setImageFile2] = useState<File | null>(null);
  const [imageFile3, setImageFile3] = useState<File | null>(null);
  const [imageFile4, setImageFile4] = useState<File | null>(null);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const fileInputRef4 = useRef<HTMLInputElement>(null);

  const [imgErr1, setimgErr1] = useState("");
  const [imgErr2, setimgErr2] = useState("");
  const [imgErr3, setimgErr3] = useState("");
  const [imgErr4, setimgErr4] = useState("");

  const handleImageUploadClick1 = () => {
    fileInputRef1.current?.click();
  };
  const handleImageUploadClick2 = () => {
    fileInputRef2.current?.click();
  };
  const handleImageUploadClick3 = () => {
    fileInputRef3.current?.click();
  };
  const handleImageUploadClick4 = () => {
    fileInputRef4.current?.click();
  };

  const updateImage1 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > mbLimit) {
        setimgErr1("image size should be less than 10mb");
        return;
    }
    if (!(file.type.startsWith("image/"))) {
      setimgErr1("file must be an image");
      return;
  }
    setImageFile1(file);
  };}

  const updateImage2 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > mbLimit) {
        setimgErr2("image size should be less than 10mb");
        return;
    }
    if (!(file.type.startsWith("image/"))) {
      setimgErr2("file must be an image");
      return;
  }
    setImageFile2(file);
  };}

  const updateImage3 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > mbLimit) {
        setimgErr3("image size should be less than 10mb");
        return;
    }
    if (!(file.type.startsWith("image/"))) {
      setimgErr3("file must be an image");
      return;
  }
    setImageFile3(file);
  };}

  const updateImage4 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > mbLimit) {
        setimgErr4("image size should be less than 10mb");
        return;
    }
    if (!(file.type.startsWith("image/"))) {
      setimgErr4("file must be an image");
      return;
  }
    setImageFile4(file);
  };}

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop1 = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.size > mbLimit){
        setimgErr1("image size should be less than 10mb");
        return;
    }
    if (!(file.type.startsWith("image/"))) {
      setimgErr1("file must be an image");
      return;
  }
      setImageFile1(file);
  
    }};

  const handleFileDrop2 = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.size > mbLimit){
        setimgErr2("image size should be less than 10mb");
        return;
    }
    if (!(file.type.startsWith("image/"))) {
      setimgErr2("file must be an image");
      return;
  }
      setImageFile2(file);
    }};

    const handleFileDrop3 = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        const file = event.dataTransfer.files[0];
        if (file.size > mbLimit){
          setimgErr3("image size should be less than 10mb");
          return;
        }
      if (!(file.type.startsWith("image/"))) {
        setimgErr3("file must be an image");
        return;
    }
        setImageFile3(file);
      }};

      const handleFileDrop4 = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.size > mbLimit){
            setimgErr4("image size should be less than 10mb");
            return;
        }
        if (!(file.type.startsWith("image/"))) {
          setimgErr4("file must be an image");
          return;
      }
          setImageFile4(file);
        }};

  const deleteRequest = async () => {
    const { id } = params;
    setLoading(true);
    setTimeout(async () => {
     axios.delete(`/api/products/${id}`).then((res:any) => {
        if (res.statusText !== "OK") {
            console.log(res.message);
            toast.error("Delete action failed"); 
            return;
          } 
        else {
             navigate('/admin/products');
             toast.success("item deleted successfully"); 
            }
        })
      setLoading(false);
      handleClose();
      dispatch(deleteProduct(id));
    }, 1500);
  };

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
const inputText = watch('description', '');
useEffect(()=>{
  setinputLength(inputText.length);
},[inputText])

const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
  
  if (data.category == "featured") {
    toast.error("category cannot be featured");
    return;
  }
  // check image error here
  if (!imageFile1 || imgErr1.length > 1) {
    toast.error("no image selected Input 1");
    return;
  }
  if (!imageFile2 || imgErr2.length) {
    toast.error("no image selected Input 2");
    return;
  }
  if (!imageFile3 || imgErr3.length > 1) {
    toast.error("no image selected Input 3");
    return;
  }
  if (!imageFile4 || imgErr4.length) {
    toast.error("no image selected Input 4");
    return;
  }
  // append to formData for backend
  const payload = new FormData();
  payload.append('name',data.name);
  payload.append('price', data.price);
  payload.append('units',data.units);
  payload.append('category', data.category);
  payload.append('type',data.type);
  payload.append('keyword', data.keyword);
  payload.append('description',data.description);
  payload.append('img1',imageFile1);
  payload.append('img2',imageFile2);
  payload.append('img3',imageFile3);
  payload.append('img4',imageFile4);
  // axios.post('api/products/test', payload, {headers:{'Content-Type': "multipart/form-data"}})
  // dont specify headers when using formdata since it is handled by formData
  axios.put('/api/products/'+specifiedProduct?._id, payload)
  .then((res:any) => {
      if (res.statusText == "OK") {
        setShow(false);
        toast.success("product modified and saved");
      }
    })
    .catch((error) => {
      console.log(error);
      setError('root', { 
        message: error.response.data.error ||
         error.response.data ||
         "backend error"
         });
      (
          error.response.data.error 
       || error.response.data).length > 30
       || !error.response.data ?
       toast.error("failed to modify item") : 
        toast.error(error.response.data.error || error.response.data)
    })
}
  return (
    <div>
        <div className="row justify-content-center gap-4">
         { productLoading ? 
         <ProductCardSkeleton type="desc" count={1}/>        
         : 
         <> <div className="img-content col-lg-4 py-3">
                           <i className="fa fa-arrow-circle-left fa-2x" aria-hidden="true"></i>
                           <img className="img-front" src={require("../../../assets/"+specifiedProduct?.photos[active])}  alt="" width="" />
                           <i className="fa fa-arrow-circle-right fa-2x" aria-hidden="true"></i>
                           <div className="img-slider p-1">
                              <img className={active == 0 ? "img-fluid active" : "img-fluid"} src={require("../../../assets/"+specifiedProduct?.photos[0])} alt="" width="55" onClick={()=>setActive(0)} />
                              <img className={active == 1 ? "img-fluid active" : "img-fluid"}  src={require("../../../assets/"+specifiedProduct?.photos[1])} alt="" width="55" onClick={()=>setActive(1)} />
                              <img className={active == 2 ? "img-fluid active" : "img-fluid"}  src={require("../../../assets/"+specifiedProduct?.photos[2])} alt="" width="55" onClick={()=>setActive(2)} />
                              <img className={active == 3 ? "img-fluid active" : "img-fluid"}  src={require("../../../assets/"+specifiedProduct?.photos[3])} alt="" width="55" onClick={()=>setActive(3)} />
                           </div>
                        </div>
                    <div className="col-lg-4 py-3">
                            <h2>{specifiedProduct?.name}</h2>
                            <small>Market: Gigi Store | units left: {specifiedProduct?.available}</small>
                            <div id="star" className="d-flex justify-content-start align-items-center g-3 my-3">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-o"></i>
                            </div>
                            <h6>Description</h6>
                            <hr style={{ opacity: 0.7 }} />
                            <div className="descx">
                            <p>{specifiedProduct?.description}</p>
                            </div>
                        </div>
        </> }
        </div>
       <div className='mt-3 d-flex justify-content-center gap-5'>
          <button className='py-2 px-5 btn btn-customx' disabled={productLoading} onClick={handleShow}> Edit</button> 
          <button className='py-2 px-5 btn btn-danger'disabled={productLoading} onClick={openModal}> Delete</button>
       </div> 
       <Modal show={show} onHide={handleClose} id="modaldefault">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="px-3">
       
        <TextField
            label="Product name"
            defaultValue={specifiedProduct?.name}
            fullWidth
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
           <TextField
            label="price"
            defaultValue={specifiedProduct?.price}
            fullWidth
            margin="normal"
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            label="Units"
            defaultValue={specifiedProduct?.available}
            fullWidth
            margin="normal"
            {...register("units")}
            error={!!errors.units}
            helperText={errors.units?.message}
          />
           <TextField
            label="Category"
            defaultValue={specifiedProduct?.category}
            fullWidth
            margin="normal"
            placeholder='com, limited or top'
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
           <TextField
            label="Keywords"
            defaultValue={specifiedProduct?.keywords.toString().replaceAll(','," ")}
            fullWidth
            margin="normal"
            placeholder='eg s7 galaxy samsung android 256gb '
            {...register("keyword")}
            error={!!errors.keyword}
            helperText={errors.keyword?.message}
          />
           <TextField
            label="Type of Product"
            defaultValue={specifiedProduct?.type}
            fullWidth
            margin="normal"
            placeholder='eg laptop, mobile, computer, battery, ear phone'
            {...register("type")}
            error={!!errors.type}
            helperText={errors.type?.message}
          />
          <div className='d-flex justify-content-end'> <span className="text-muted small">{inputLength} / 500</span></div>
       <Controller 
         name='description'
         control={control}
         defaultValue={specifiedProduct?.description}
         render={({ field }) => (
          <TextField
          {...field}
            label="Description"
            fullWidth
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            onChange={(e) => {
            field.onChange(e); setinputLength(e.target.value.length);       
            }}
          />
         )}
       />
  <Typography sx={{ mt: 3, opacity:0.7}}> Product Display Image </Typography>
 <div className="imageContainer">
      <div
        className="dropZone"
        onDragOver={handleDragOver}
        onDrop={handleFileDrop1}
        onClick={handleImageUploadClick1}
      >
        {imageFile1 ? (
          <img
            src={ imgErr1.length > 1 ? undefined : URL.createObjectURL(imageFile1) }
            alt="no image selected"
            className="uploadedImage"
          />
        ) : (
          <span>Choose file or drag it here</span>
        )}
          <input
          ref={fileInputRef1}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={updateImage1}
        />
       
      </div>
      {imgErr1.length > 1 && <p style={{ color: 'tomato'}}>{imgErr1}</p>}
    </div>

    <Typography sx={{ mt: 3, opacity:0.7}}> Other Image 1 </Typography>
     <div className="imageContainer">
      <div
        className="dropZone"
        onDragOver={handleDragOver}
        onDrop={handleFileDrop2}
        onClick={handleImageUploadClick2}
      >
        {imageFile2 ? (
          <img
            src={imgErr2.length > 1 ? undefined : URL.createObjectURL(imageFile2)}
            alt="no image selected"
            className="uploadedImage"
          />
        ) : (
          <span>Choose file or drag it here</span>
        )}
          <input
          ref={fileInputRef2}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={updateImage2}
        />
       
      </div>
      {imgErr2.length > 1 && <p style={{ color: 'tomato'}}>{imgErr2}</p>}
    </div>
    <Typography sx={{ mt: 3, opacity:0.7}}> Other Image 2 </Typography>
     <div className="imageContainer">
      <div
        className="dropZone"
        onDragOver={handleDragOver}
        onDrop={handleFileDrop3}
        onClick={handleImageUploadClick3}
      >
        {imageFile3 ? (
          <img
            src={imgErr3.length > 1 ? undefined : URL.createObjectURL(imageFile3)}
            alt="no image selected"
            className="uploadedImage"
          />
        ) : (
          <span>Choose file or drag it here</span>
        )}
          <input
          ref={fileInputRef3}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={updateImage3}
        />
       
      </div>
      {imgErr3.length > 1 && <p style={{ color: 'tomato'}}>{imgErr3}</p>}
    </div>
    <Typography sx={{ mt: 3, opacity:0.7}}> Other Image 3 </Typography>
     <div className="imageContainer">
      <div
        className="dropZone"
        onDragOver={handleDragOver}
        onDrop={handleFileDrop4}
        onClick={handleImageUploadClick4}
      >
        {imageFile4 ? (
          <img
            src={imgErr4.length > 1 ? undefined : URL.createObjectURL(imageFile4)}
            alt="no image selected"
            className="uploadedImage"
          />
        ) : (
          <span>Choose file or drag it here</span>
        )}
          <input
          ref={fileInputRef4}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={updateImage4}
        />
      </div>
      {imgErr4.length > 1 && <p style={{ color: 'tomato'}}>{imgErr4}</p>}
    </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary py-2 px-4" onClick={handleClose}>Close</button>
          <button type="submit" className="btn btn-customx py-2 px-4" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Confirm'}
            </button>
        </Modal.Footer>
        </form>
      </Modal>
      <Modal
          show={open}
          onHide={closeModal}
          className='modaldefault'
          >
         <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
             <Modal.Body>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this product.
            </Typography>
            </Modal.Body>
            <Modal.Footer>
            <div className="mt-3 flex">
            <button className='mt-2 py-2 px-4 btn btn-secondary me-3' onClick={closeModal}>Cancel</button>
               <button className='mt-2 py-2 px-4 btn btn-danger' onClick={deleteRequest}>
               {loading ? (
                    <CircularProgress size={15} sx={{ color: "#fff", marginRight:'10px' }} />
                  ) : (
                    ""
                  )}
                Confirm Delete
                </button>
            </div>
          </Modal.Footer>
        </Modal>
        </div>
  )
}

