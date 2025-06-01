import axios from 'axios'
import { useSelector } from 'react-redux'

function filterArr(originalArray: Itemtype[]) {
  const newArray = originalArray.map((obj) => {
    const { _id, name, price, photos, quantity } = obj
    return { _id, name, price, photo: photos[0], quantity }
  })
  return newArray
}

export default function AddOrder() {
  const { currentUser } = useSelector((state: any) => state.user)
  const { items, totalQuantity, totalAmount } = useSelector(
    (state: any) => state.cart
  )
  const add = () => {
    if (items.length > 0) {
      const newOrder = filterArr(items)
      axios
        .post('/api/orders', {
          new_order: newOrder,
          user_id: currentUser._id,
          quantity: totalQuantity,
          amount: totalAmount,
        })
        .then(() => {
          alert('added oreder')
        })
        .catch((err) => {
          alert('error occurred')
          console.log('SERVER ERROR ', err)
        })
    }
  }
  return (
    <div>
      <button className="btn btn-primary p-2" onClick={add}>
        Add Order
      </button>
    </div>
  )
}
