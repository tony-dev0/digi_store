import LoupeIcon from '@mui/icons-material/Loupe'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { addProduct } from '../../redux/admin/adminSlice'
import { FeaturedProductsComponent } from '../components/FeaturedProductsComponent'
import { TopProductsComponent } from '../components/TopProductsComponent'
import { LimitedProductsComponent } from '../components/LimitedProductsComponent'
import { MainProductsComponent } from '../components/MainProductsComponent'

const schema = z.object({
  name: z.string().min(10),
  units: z.string(),
  price: z.string(),
  category: z.string(),
  keywords: z.string(),
  type: z.string().min(3),
  description: z
    .string()
    .min(20, { message: 'text should not be less than 20 characters' })
    .max(500, { message: 'text should not be more than 500 characters' }),
})

type FormFields = z.infer<typeof schema>

export default function Products() {
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const mbLimit = 8 * 1024 * 1024
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { productLoading, products } = useSelector((state: any) => state.admin)
  const [imageFile1, setImageFile1] = useState<File | null>(null)
  const [imageFile2, setImageFile2] = useState<File | null>(null)
  const [imageFile3, setImageFile3] = useState<File | null>(null)
  const [imageFile4, setImageFile4] = useState<File | null>(null)

  const fileInputRef1 = useRef<HTMLInputElement>(null)
  const fileInputRef2 = useRef<HTMLInputElement>(null)
  const fileInputRef3 = useRef<HTMLInputElement>(null)
  const fileInputRef4 = useRef<HTMLInputElement>(null)

  const [imgErr1, setimgErr1] = useState('')
  const [imgErr2, setimgErr2] = useState('')
  const [imgErr3, setimgErr3] = useState('')
  const [imgErr4, setimgErr4] = useState('')

  const handleImageUploadClick1 = () => {
    fileInputRef1.current?.click()
  }
  const handleImageUploadClick2 = () => {
    fileInputRef2.current?.click()
  }
  const handleImageUploadClick3 = () => {
    fileInputRef3.current?.click()
  }
  const handleImageUploadClick4 = () => {
    fileInputRef4.current?.click()
  }

  const updateImage1 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (file.size > mbLimit) {
        setimgErr1('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr1('file must be an image')
        return
      }
      setImageFile1(file)
    }
  }

  const updateImage2 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (file.size > mbLimit) {
        setimgErr2('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr2('file must be an image')
        return
      }
      setImageFile2(file)
    }
  }

  const updateImage3 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (file.size > mbLimit) {
        setimgErr3('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr3('file must be an image')
        return
      }
      setImageFile3(file)
    }
  }

  const updateImage4 = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (file.size > mbLimit) {
        setimgErr4('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr4('file must be an image')
        return
      }
      setImageFile4(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileDrop1 = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      if (file.size > mbLimit) {
        setimgErr1('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr1('file must be an image')
        return
      }
      setImageFile1(file)
    }
  }

  const handleFileDrop2 = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      if (file.size > mbLimit) {
        setimgErr2('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr2('file must be an image')
        return
      }
      setImageFile2(file)
    }
  }

  const handleFileDrop3 = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      if (file.size > mbLimit) {
        setimgErr3('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr3('file must be an image')
        return
      }
      setImageFile3(file)
    }
  }

  const handleFileDrop4 = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      if (file.size > mbLimit) {
        setimgErr4('image size should be less than 10mb')
        return
      }
      if (!file.type.startsWith('image/')) {
        setimgErr4('file must be an image')
        return
      }
      setImageFile4(file)
    }
  }

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

  const [inputLength, setinputLength] = useState(0)
  const inputText = watch('description', '')
  useEffect(() => {
    setinputLength(inputText.length)
  }, [inputText])

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    // check image error here
    if (!imageFile1 || imgErr1.length > 1) {
      toast.error('no image selected Input 1')
      return
    }
    if (!imageFile2 || imgErr2.length) {
      toast.error('no image selected Input 2')
      return
    }
    if (!imageFile3 || imgErr3.length > 1) {
      toast.error('no image selected Input 3')
      return
    }
    if (!imageFile4 || imgErr4.length) {
      toast.error('no image selected Input 4')
      return
    }
    // append to formData for backend
    const payload = new FormData()
    payload.append('name', data.name)
    payload.append('price', data.price)
    payload.append('units', data.units)
    payload.append('category', data.category)
    payload.append('type', data.type)
    payload.append('keywords', data.keywords)
    payload.append('description', data.description)
    payload.append('img1', imageFile1)
    payload.append('img2', imageFile2)
    payload.append('img3', imageFile3)
    payload.append('img4', imageFile4)

    setloading(true)
    axios
      .post('/api/products', payload)
      .then((res: any) => {
        if (res.statusText == 'OK') {
          setTimeout(() => {
            setloading(false)
            setShow(false)
            toast.success('product saved to database')
            dispatch(addProduct(res.data))
          }, 15000)
        }
      })
      .catch((error) => {
        console.log(error)
        setloading(false)
        setError('root', {
          message: 'backend error',
        })
        toast.error('failed to save item')
      })
  }
  return (
    <div className="px-2">
      <div className="title-head-user mt-2 mb-2">
        {' '}
        <p> Manage Products </p>{' '}
      </div>
      <div className="w-100 d-flex justify-content-end mb-3">
        <button className="py-2 px-2 btn btn-customx" onClick={handleShow}>
          <LoupeIcon /> Add New Product
        </button>
      </div>
      <section className="featured" id="featured">
        <h2 className="mb-2">Featured Category</h2>
        <div id="main_row" className="main_row">
          {productLoading ? (
            <ProductCardSkeleton type="featured" count={8} />
          ) : (
            products.map((product: Itemtype, i: any) => {
              if (product.category == 'featured') {
                return <FeaturedProductsComponent index={i} product={product} />
              }
            })
          )}
        </div>
      </section>

      <section className="top_items py-5" id="product">
        <h2 className="mb-3 ms-2">Top Selling items</h2>
        <div className="wrapper-contain-item">
          {productLoading ? (
            <ProductCardSkeleton count={8} />
          ) : (
            products.map((product: Itemtype, i: any) => {
              if (product.category == 'top') {
                return <TopProductsComponent index={i} product={product} />
              }
            })
          )}
        </div>
      </section>

      <section className="top_items py-5" id="product">
        <h2 className="mb-3 ms-2">Limited Stock Deals</h2>
        <div className="wrapper-contain-item">
          {productLoading ? (
            <ProductCardSkeleton count={8} />
          ) : (
            products.map((product: Itemtype, i: any) => {
              if (product.category == 'limited') {
                return <LimitedProductsComponent index={i} product={product} />
              }
            })
          )}
        </div>
      </section>

      <section className="top_items py-5" id="product">
        <h2 className="mb-3 ms-2">Mobile/tablet and Laptop</h2>
        <div className="wrapper-contain-item">
          {productLoading ? (
            <ProductCardSkeleton count={8} />
          ) : (
            products.map((product: Itemtype, i: any) => {
              if (product.category == 'com') {
                return <MainProductsComponent index={i} product={product} />
              }
            })
          )}
        </div>
      </section>

      <Modal show={show} onHide={handleClose} id="modaldefault">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="px-3">
            <TextField
              label="Product name"
              fullWidth
              margin="normal"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="price"
              fullWidth
              margin="normal"
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              label="Units"
              fullWidth
              margin="normal"
              {...register('units')}
              error={!!errors.units}
              helperText={errors.units?.message}
            />
            <TextField
              label="Category"
              fullWidth
              margin="normal"
              placeholder="com, limited or top"
              {...register('category')}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
            <TextField
              label="Keywords"
              fullWidth
              margin="normal"
              placeholder="eg s7 galaxy samsung android 256gb "
              {...register('keywords')}
              error={!!errors.keywords}
              helperText={errors.keywords?.message}
            />
            <TextField
              label="Type of Product"
              fullWidth
              margin="normal"
              placeholder="eg laptop, mobile, computer, battery, ear phone"
              {...register('type')}
              error={!!errors.type}
              helperText={errors.type?.message}
            />
            <div className="d-flex justify-content-end">
              {' '}
              <span className="text-muted small">{inputLength} / 500</span>
            </div>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  onChange={(e) => {
                    field.onChange(e)
                    setinputLength(e.target.value.length)
                  }}
                />
              )}
            />
            <Typography sx={{ mt: 3, opacity: 0.7 }}>
              {' '}
              Product Display Image{' '}
            </Typography>
            <div className="imageContainer">
              <div
                className="dropZone"
                onDragOver={handleDragOver}
                onDrop={handleFileDrop1}
                onClick={handleImageUploadClick1}
              >
                {imageFile1 ? (
                  <img
                    src={
                      imgErr1.length > 1
                        ? undefined
                        : URL.createObjectURL(imageFile1)
                    }
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
                  style={{ display: 'none' }}
                  onChange={updateImage1}
                />
              </div>
              {imgErr1.length > 1 && (
                <p style={{ color: 'tomato' }}>{imgErr1}</p>
              )}
            </div>

            <Typography sx={{ mt: 3, opacity: 0.7 }}>
              {' '}
              Other Image 1{' '}
            </Typography>
            <div className="imageContainer">
              <div
                className="dropZone"
                onDragOver={handleDragOver}
                onDrop={handleFileDrop2}
                onClick={handleImageUploadClick2}
              >
                {imageFile2 ? (
                  <img
                    src={
                      imgErr2.length > 1
                        ? undefined
                        : URL.createObjectURL(imageFile2)
                    }
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
                  style={{ display: 'none' }}
                  onChange={updateImage2}
                />
              </div>
              {imgErr2.length > 1 && (
                <p style={{ color: 'tomato' }}>{imgErr2}</p>
              )}
            </div>
            <Typography sx={{ mt: 3, opacity: 0.7 }}>
              {' '}
              Other Image 2{' '}
            </Typography>
            <div className="imageContainer">
              <div
                className="dropZone"
                onDragOver={handleDragOver}
                onDrop={handleFileDrop3}
                onClick={handleImageUploadClick3}
              >
                {imageFile3 ? (
                  <img
                    src={
                      imgErr3.length > 1
                        ? undefined
                        : URL.createObjectURL(imageFile3)
                    }
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
                  style={{ display: 'none' }}
                  onChange={updateImage3}
                />
              </div>
              {imgErr3.length > 1 && (
                <p style={{ color: 'tomato' }}>{imgErr3}</p>
              )}
            </div>
            <Typography sx={{ mt: 3, opacity: 0.7 }}>
              {' '}
              Other Image 3{' '}
            </Typography>
            <div className="imageContainer">
              <div
                className="dropZone"
                onDragOver={handleDragOver}
                onDrop={handleFileDrop4}
                onClick={handleImageUploadClick4}
              >
                {imageFile4 ? (
                  <img
                    src={
                      imgErr4.length > 1
                        ? undefined
                        : URL.createObjectURL(imageFile4)
                    }
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
                  style={{ display: 'none' }}
                  onChange={updateImage4}
                />
              </div>
              {imgErr4.length > 1 && (
                <p style={{ color: 'tomato' }}>{imgErr4}</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary py-2 px-4"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-customx py-2 px-4"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Confirm'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}
