import { Box, Fab, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Check, Delete, Save } from '@mui/icons-material'
import { green } from '@mui/material/colors'
import Modal from '@mui/material/Modal'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { deleteUser, updateUser } from '../../redux/admin/adminSlice'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0.5px solid #000',
  boxShadow: 24,
  p: 4,
}

export const SaveAction = ({ params, rowId, setRowId }: any) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    const { id } = params
    setLoading(true)
    setTimeout(async () => {
      axios.put(`/api/users/${id}`, params.row).then((res: any) => {
        if (res.statusText !== 'OK') {
          toast.error(res.message)
          return
        }
        setSuccess(true)
        toast.success('Updated row successfully')
        setRowId(null)
      })
      setLoading(false)
      dispatch(updateUser(params.row))
    }, 2000)
  }

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false)
  }, [rowId])

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  )
}

export const DeleteAction = ({ params }: any) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    const { id } = params
    setLoading(true)
    setTimeout(async () => {
      axios.delete(`/api/users/${id}`).then((res: any) => {
        if (res.statusText !== 'OK') {
          console.log(res.message)
          return
        } else {
          toast.success('User deleted successfully')
        }
      })
      setLoading(false)
      handleClose()
      dispatch(deleteUser(id))
    }, 1500)
  }

  return (
    <>
      <Toaster position="top-right" />
      <Box
        sx={{
          m: 1,
          position: 'relative',
        }}
      >
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={handleOpen}
        >
          <Delete />
        </Fab>
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
              Are you sure you want to delete user {params.row.email} Account.
            </Typography>
            <div className="mt-3 flex">
              <button
                className="mt-2 py-2 px-4 btn btn-secondary me-3"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="mt-2 py-2 px-4 btn btn-danger"
                onClick={handleSubmit}
              >
                {loading ? (
                  <CircularProgress
                    size={15}
                    sx={{ color: '#fff', marginRight: '10px' }}
                  />
                ) : (
                  ''
                )}
                Confirm Delete
              </button>
            </div>
          </Box>
        </Modal>
      </Box>
    </>
  )
}
