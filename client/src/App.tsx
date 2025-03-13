import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateLayout from './components/PrivateLayout';
import PrivateRoute from './components/PrivateRoute';
import Overview from "./admin/views/overview";
import Users from "./admin/views/users";
import Products from "./admin/views/products";
import Messages from "./admin/views/messages";
import SiteSettings from "./admin/views/site-settings";
import { Toaster } from 'react-hot-toast';
import { Home } from './page/home';
import { Login } from './page/login';
import { Register } from './page/register'; 
import { ErrorPage } from './page/error'; 
import PaymentError  from './page/payment_error';
import PaymentSuccess from './page/payment_success';
import Cart from './page/cart'; 
import Desc from './page/desc';
import Search from './page/search';
import Account from './page/account';
import Orders from './page/orders';
import Reviews from './page/reviews';
import SavedItems from './page/saved-items';
import Voucher from './page/voucher';
import Inbox from './page/inbox';
import AddressBook from './page/address-book';
import EditAddress from './page/edit-address';
import NewsletterPreference from './page/newsletter-preference';
import AdminLayout from './admin/layouts/AdminLayout';
import ViewProduct from './admin/views/subviews/ViewProduct';
import axios from 'axios';
import './styles/style.css';
import './styles/ctrl.css';
import "./styles/auth.css";
import "./styles/desc.css";
import Calender from './admin/views/calender';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.baseURL = 'http://192.168.204.89:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
       <BrowserRouter> 
        <Toaster position='top-right' toastOptions={{duration: 4000}} />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/desc/:id" element={<Desc />} /> 
            <Route path="/products/search/:q" element={<Search />} /> 


             <Route element={<PrivateLayout />}>
              <Route path='/account' element={<Account />} />
                <Route path='/orders' element={<Orders />} />
                  <Route path='/reviews' element={<Reviews />} />
                   <Route path='/saved-items' element={<SavedItems />} />
                     <Route path='/voucher' element={<Voucher />} /> 
                       <Route path='/inbox' element={<Inbox />} /> 
                         <Route path='/address-book' element={<AddressBook />} /> 
                           <Route path='/edit-address' element={<EditAddress />} /> 
                             <Route path='/newsletter-preference' element={<NewsletterPreference />} /> 
               </Route> 
            
            <Route element={<PrivateRoute />}>
            <Route path='/payment-success' element={<PaymentSuccess />} /> 
            <Route path='/payment-error' element={<PaymentError />} /> 
              {/* <Route path='/manage-account' element={<ManageAccount />} /> */}
                {/* <Route path='/pin-setup' element={<PinSetup />} /> */}
                  {/* <Route path='/edit-profile' element={<EditProfile />} /> */}
                    {/* <Route path='/delete-account' element={<DeleteAccount />} /> */}
                      {/* <Route path='/change-password' element={<ChangePassword />} /> */}
            </Route> 
            {/* admin area */}
             <Route element={<AdminLayout />}>
                <Route path='/admin' element={<Overview />} />
                 <Route path='/admin/dashboard' element={<Overview />} />
                  <Route path='/admin/overview' element={<Overview />} />
                    <Route path='/admin/users' element={<Users />} />
                     <Route path='/admin/products' element={<Products />} />
                     <Route path='/admin/products/desc/:id' element={<ViewProduct />} />
                       <Route path='/admin/messages' element={<Messages />} />
                       {/* <Route path="/admin/notify-client" element={<NotifyClient />} />
                        <Route path="/admin/email-client" element={<EmailClient />} />
                          <Route path="/admin/recieved-messages" element={<RecievedMessages />} />
                            <Route path="/admin/sent-messages" element={<SentMessages />} /> */}
                              <Route path='/admin/calender' element={<Calender />} />
                               <Route path='/admin/site-settings' element={<SiteSettings />} /> 
               </Route>
            <Route path="*" element={<ErrorPage />} /> 
        </Routes>
       </BrowserRouter>
  );
}

export default App;