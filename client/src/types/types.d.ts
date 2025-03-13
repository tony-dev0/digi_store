interface userType {
    username: string;
    email:string;
    phone:string;
}

interface productType {
    type: string;
    price:string;
}

interface usersType {
    data: userType[];
    error: string;
    loading: boolean;
}

interface productsType {
    data: productType[];
    error: string;
    loading: boolean;
}

interface TabletypeGrid {
    _id: string;
    firstname: string | null;
    lastname: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    region: string;
    city: string;
    phone_alt: string;
    delivery_address: string;
    other_info: string;
    createdAt: string;
  }

interface Itemtype {
    _id: string;
    category: string;
    photos: string[];
    description: string;
    available: string;
    name: string;
    price: number;
    quantity:number;
    prevprice: number;
}

interface userStateType {
    _id: string;
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    email: string;
    phone: string;
    phone_alt: string | null;
    region: string | null;
    city: string | null;
    delivery_address: string | null;
    other_info: string | null;
    createdAt: string;
}
interface productStateType{
    _id: string,
    name: string,
    category: string,
    type: string,
    keywords: string[],
    price: number,
    prevprice: number,
    available: string,
    photos: string[],
    description: string
}
interface overview {
    value: number,
    title: string,
    percent: number,
    percentdesc: string,
}
interface recieved_notifications {
    _id: string,
    name: string,
    email: string,
    title: string,
    message: string,
    date: string,
    session_email: string,
    session_status: string
}

interface sent_notifications {
    _id: string,
    icon: string,
    title: string,
    message: string,
    recipients: string[],
    date: string,
}

interface recipient {
    id:string,
    email:string
}

interface adminState {
    users:userStateType[],
    products: productStateType[]
    recieved_notifications: recieved_notifications[],
    sent_notifications: sent_notifications[],
    productLoading: boolean,
    // NotificationLoading: boolean
}
  
const initialState: adminState = {
    users: [],
    products: []
};

interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}
  
interface CartState {
    items: CartItem[];
    totalAmount: number;
    totalQuantity: number;
}
// interface valueTypes {
//     firstname: string;
//     lastname: string;
//     email: string;
//     phone: string;
//     password: string;
//     cpassword: string;
// }