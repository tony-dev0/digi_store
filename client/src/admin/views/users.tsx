import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridCsvExportOptions,
  GridCsvGetRowsToExportParams,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  GridToolbarContainer,
  gridExpandedSortedRowIdsSelector,
  useGridApiContext,
} from '@mui/x-data-grid'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createSvgIcon } from '@mui/material/utils'
import Modal from 'react-bootstrap/Modal'
import { Button, ButtonProps, TextField } from '@mui/material'
import { SaveAction, DeleteAction } from './actions'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { addUser } from '../../redux/admin/adminSlice'
import { SubmitHandler, useForm } from 'react-hook-form'

const date = Date.now()

const options: any = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

const formatedDate = new Intl.DateTimeFormat('en-GB', options).format(date)
const getRowsFromCurrentPage = ({ apiRef }: GridCsvGetRowsToExportParams) =>
  gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)

const getUnfilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
  gridSortedRowIdsSelector(apiRef)

const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
  gridExpandedSortedRowIdsSelector(apiRef)

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt'
)

function CustomToolbar() {
  const apiRef = useGridApiContext()

  const handleExport = (options: GridCsvExportOptions) =>
    apiRef.current.exportDataAsCsv(options)

  const buttonBaseProps: ButtonProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  }
  return (
    <GridToolbarContainer>
      <Button
        {...buttonBaseProps}
        onClick={() =>
          handleExport({ getRowsToExport: getRowsFromCurrentPage })
        }
      >
        Current page rows
      </Button>
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
      >
        Filtered rows
      </Button>
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
      >
        Unfiltered rows
      </Button>
    </GridToolbarContainer>
  )
}

const others = {
  firstname: 'null',
  lastname: 'null',
  phone_alt: 'null',
  other_info: 'null',
  delivery_info: 'null',
  saved_items: 'null',
  region: 'null',
  city: 'null',
  createdAt: formatedDate,
}

const schema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5, { message: 'phone number invalid' }).max(15),
  password: z.string().min(8),
})

type FormFields = z.infer<typeof schema>

const Users = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [PaginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  })
  const { users } = useSelector((state: any) => state.admin)
  const rows = users.toReversed()
  const [rowId, setRowId] = useState(null)
  const columns: GridColDef<TabletypeGrid>[] = useMemo(
    () => [
      {
        field: '_id',
        headerName: 'Id',
        width: 50,
        hideable: false,
      },
      {
        field: 'firstname',
        headerName: 'Firstname',
        width: 140,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'lastname',
        headerName: 'Lastname',
        width: 140,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 140,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'phone',
        headerName: 'Phone',
        width: 120,
        type: 'string',
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'region',
        headerName: 'Region',
        width: 100,
        type: 'string',
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'city',
        headerName: 'City',
        width: 100,
        type: 'string',
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'phone_alt',
        headerName: 'Phone line 2',
        width: 100,
        type: 'string',
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'delivery_address',
        headerName: 'Delivery Address',
        width: 160,
        type: 'string',
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'other_info',
        headerName: 'Other Info',
        width: 100,
        type: 'string',
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'createdAt',
        headerName: 'Created_At',
        width: 120,
        editable: true,
        align: 'center',
      },
      {
        field: 'save',
        headerName: 'Actions',
        width: 80,
        type: 'actions',
        renderCell: (params: any) => (
          <SaveAction {...{ params, rowId, setRowId }} />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: 'delete',
        headerName: 'Actions',
        width: 80,
        type: 'actions',
        renderCell: (params: any) => (
          <DeleteAction {...{ params, rowId, setRowId }} />
        ),
        sortable: false,
        filterable: false,
      },
    ],
    [rowId]
  )

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    axios
      .post('/api/auth/register', data)
      .then((res: any) => {
        if (res.statusText == 'OK') {
          dispatch(addUser({ _id: res.data, ...data, ...others }))
          toast.success('Account Created Successfully')
          setTimeout(() => {
            handleClose()
          }, 2000)
        }
      })
      .catch((error) => {
        setError('root', { message: error.response.data })
        error.response.data.length > 30
          ? toast.error('failed to register')
          : toast.error(error.response.data)
      })
  }
  return (
    <>
      <div className="px-2">
        <div className="title-head-user mt-2 mb-2">
          {' '}
          <p> Manage Users </p>{' '}
        </div>
        <div className="w-100 d-flex justify-content-end mb-3">
          <button className="py-2 px-4 btn btn-customx" onClick={handleShow}>
            <PersonAddIcon /> Add User
          </button>
        </div>
        <div
          className="userTable"
          style={{
            height: 450,
            overflowX: 'hidden',
          }}
        >
          <DataGrid
            columns={columns}
            rows={rows}
            slots={{ toolbar: CustomToolbar }}
            getRowClassName={(params: any) =>
              params.indexRelativeTourrentPage % 2 === 0 ? 'even' : 'odd'
            }
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: '#f3f3f3',
              },
              borderRadius: '12px',
              border: '1px solid grey',
              boxShadow: 3,
            }}
            onCellEditStop={(params: any) => setRowId(params.id)}
            paginationModel={PaginationModel}
            onPaginationModelChange={setPaginationModel}
            columnVisibilityModel={{ _id: false }}
          />
          {/* <CSVLink className='py-2 px-4 btn btn-customx' filename="myTable.csv" data={csvData}>
           Export to CSV</CSVLink> */}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Account</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className="px-3">
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Confirm'}
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  )
}

export default Users
