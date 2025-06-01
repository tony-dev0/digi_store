import { useEffect, useState } from 'react'
import { _Navbar } from '../components/Nav'
import { useLocation } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/images/logo14.png'
import Search from '../components/Search'

export const Header = () => {
  const [displaycart, setdisplayCart] = useState<boolean>(false)
  const location = useLocation()
  const pathname = location.pathname
  useEffect(() => {
    if (!pathname.startsWith('/cart')) {
      setdisplayCart(true)
    }
  }, [])
  return (
    <>
      {displaycart ? (
        <header>
          <div className="header">
            <_Navbar />
          </div>
        </header>
      ) : (
        <header>
          {' '}
          <div className="header">
            <Navbar expand="lg" className="navbar-dark">
              <Container fluid>
                <Navbar.Brand href="#">
                  <img src={logo} alt="" className="logo-image" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav className="navbar-nav me-auto mb-4 mb-lg-0">
                    <li className="nav-item mt-20px">
                      <Nav.Link href="/">Home</Nav.Link>
                    </li>
                    <li className="nav-item mt-20px">
                      <Nav.Link href="/#about">About</Nav.Link>
                    </li>
                    <li className="nav-item mt-20px">
                      <Nav.Link href="/products">Products</Nav.Link>
                    </li>
                    <li className="nav-item mt-20px">
                      <Nav.Link href="/#contact">Contact Us</Nav.Link>{' '}
                    </li>
                  </Nav>
                  <div className="mx-3"></div>
                  <Search />
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </header>
      )}
    </>
  )
}
