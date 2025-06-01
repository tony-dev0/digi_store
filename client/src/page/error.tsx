import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/images/logo14.png'
import Search from '../components/Search'
import { Link } from 'react-router-dom'
import nopage from '../assets/images/404.png'
import { Header } from '../sections/Header'
import { Footer } from '../sections/Footer'

export const ErrorPage = () => {
  return (
    <div>
      <Header />
      <div className="mb-5"></div>
      <section className="my-3 py-3">
        <div className="container nopage-box">
          <img className="nopage" src={nopage} alt="" />
          <Link to="/">
            <button className="btn btn-success rounded-3">
              START SHOPPING
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}
