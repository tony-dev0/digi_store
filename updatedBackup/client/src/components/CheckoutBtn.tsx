import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { cur } from "../currency.js";
import axios from "axios";

function filterArr(originalArray: Itemtype[]) {
  const newArray = originalArray.map((obj) => {
    const { _id, name, price, photos, quantity } = obj;
    return { _id, name, price, image: photos[0], quantity };
  });
  return newArray;
}

export const CheckoutBtn: React.FC<CheckoutBtnProps> = ({
  products,
  totalAmount,
  totalQuantity,
}) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const publishableKey = import.meta.env.STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    const new_order = filterArr(products);
    const stripe = await stripePromise;
    axios
      .post("api/checkout-session", {
        user_id: currentUser?._id,
        items: new_order,
        email: currentUser?.email,
        quantity: totalQuantity,
        amount: totalAmount,
      })
      .then((res: any) => {
        console.log(res.data);
        return stripe?.redirectToCheckout({
          sessionId: res.data.id,
        });
      })
      .catch((error) => window.alert(error?.message));
  };

  return (
    <div className="mt-6">
      {currentUser ? (
        <button
          onClick={handleCheckout}
          type="submit"
          className="btn btn-success"
        >
          Checkout {cur.format(totalAmount)}
        </button>
      ) : (
        <button className="btn btn-success">
          {" "}
          Checkout {cur.format(totalAmount)}
        </button>
      )}
      {!currentUser && (
        <p className="mt-2 text-sm font-medium text-danger opacity-75 text-center">
          Need to sign in to make checkout
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;
