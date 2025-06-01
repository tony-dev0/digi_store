import { Outlet, Link, useLocation } from 'react-router-dom'
import favicon from '../../assets/favlogo.png'
import { useEffect, useState } from 'react'
import logo from '../assets/img/logo14.png'
import male from '../assets/img/male-avatar.jpg'
import '../assets/css/adminstyles.css'
import Modal from 'react-bootstrap/Modal'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import CalenderMonthIcon from '@mui/icons-material/CalendarMonth'
import SettingsSuggestionIcon from '@mui/icons-material/SettingsSuggest'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import { Avatar } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  storeProducts,
  storeUsers,
  setproductLoader,
} from '../../redux/admin/adminSlice'
import axios from 'axios'

const drawerWidth = 240

export default function AdminLayout() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios
      .get('/api/products')
      .then((p) => {
        dispatch(storeProducts(p.data))
        setproductLoader(false)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get('/api/users')
      .then((u) => {
        dispatch(storeUsers(u.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const [show, setShow] = useState(false)
  const handleModalClose = () => setShow(false)
  const handleModalShow = () => setShow(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const location = useLocation()
  const pathname = location.pathname

  const [anchorEl, setAnchorEl] = useState(null)
  const [elem, setElem] = useState(null)
  const elemOpen = Boolean(elem)
  const open = Boolean(anchorEl)

  const handleElemClick = (event: any) => {
    setElem(event.currentTarget)
  }
  const handleElemClose = () => {
    setElem(null)
  }
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const drawer = (
    <div>
      <Toolbar>
        <div className="containerx">
          <img className="logo-imagex" src={logo} alt="" />
        </div>
      </Toolbar>
      <Divider />
      <List>
        {[
          'Overview',
          'Users',
          'Products',
          'Orders',
          'Messages',
          'Calender',
          'Site Settings',
        ].map((text, index) => (
          <Link
            to={'/admin/' + text.toLowerCase().replace(' ', '-')}
            key={index}
          >
            <ListItem
              key={text}
              disablePadding
              sx={{
                backgroundColor: pathname.startsWith(
                  '/admin/' + text.toLowerCase().replace(' ', '-')
                )
                  ? '#8280ae'
                  : '',
                color: pathname.startsWith(
                  '/admin/' + text.toLowerCase().replace(' ', '-')
                )
                  ? '#ffffff'
                  : '',
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: pathname.startsWith(
                      '/admin/' + text.toLowerCase().replace(' ', '-')
                    )
                      ? 'var(--color-primary)'
                      : '',
                  }}
                >
                  {index === 0 && <DashboardIcon />}
                  {index === 1 && <GroupIcon />}
                  {index === 2 && <Inventory2Icon />}
                  {index === 3 && <AccountTreeIcon />}
                  {index === 4 && <MailIcon />}
                  {index === 5 && <CalenderMonthIcon />}
                  {index === 6 && <SettingsSuggestionIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <div className="d-flex justify-content-center w-100">
        <button className="mt-5 py-2 px-4 btn btn-customx">
          Logout Session
        </button>
      </div>
    </div>
  )

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window.document.body : undefined

  return (
    <>
      <Helmet>
        <title>Digi Store - Admin panel</title>
        <link rel="icon" href={favicon} type="image/png" />
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar className="toolbarx">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <div className="d-flex justify-content-between w-100">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: 600 }}
              >
                Dashboard
              </Typography>
              <div className="d-flex gap-3 align-items-center">
                <div>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-settings' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <SettingsOutlinedIcon className="cursor-pointer text-white" />
                  </IconButton>
                </div>
                <div>
                  <IconButton onClick={handleModalShow}>
                    <NotificationsNoneRoundedIcon className="cursor-pointer text-white" />
                  </IconButton>
                </div>
                <div className="d-sm-flex gap-2 align-items-center">
                  <div>
                    <IconButton
                      onClick={handleElemClick}
                      size="small"
                      aria-controls={elemOpen ? 'account-info' : undefined}
                      aria-haspopup="true"
                      aria-expanded={elemOpen ? 'true' : undefined}
                    >
                      <Avatar
                        src={male}
                        style={{
                          height: '25px',
                          width: '25px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                        }}
                      />
                    </IconButton>
                  </div>
                  <div className="d-none d-sm-flex flex-column gap-1" id="">
                    <span style={{ fontSize: '10px' }}>Mac Anthony</span>
                    <span style={{ fontSize: '10px' }}>Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <main id="main">
            <Outlet />
          </main>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-settings"
        open={open}
        // onMouseLeave={handleClose}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Manage Admins</MenuItem>
        <MenuItem>Manage Employees</MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={elem}
        id="account-info"
        open={elemOpen}
        onClose={handleElemClose}
        onClick={handleElemClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Name: Mac Anthony</MenuItem>
        <MenuItem>Role: Owner</MenuItem>
        <MenuItem>Designation: Chief Executive Officer</MenuItem>
      </Menu>
      {/* modal start */}
      <Modal show={show} onHide={handleModalClose} style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title>Notification Center </Modal.Title>
        </Modal.Header>
        <Modal.Body>You Currently do not have any Notification!</Modal.Body>
        <Modal.Footer>
          <button
            className="py-2 px-4 btn btn-customx"
            onClick={handleModalClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      ;
    </>
  )
}
