import saveditems from '../assets/icons/acct/savedItems.svg'
export default function savedItems() {
  return (
    <>
      <div className="mtg bbot">
        <h3>Saved Items</h3>
      </div>
      <div className="container">
        <div className="content">
          <img src={saveditems} alt="" />
          <p>You haven't saved an item yet!</p>
          <p>Found something you like? Tap on the heart shaped icon next to </p>
          <p>
            {' '}
            the item to add it to your wishlist! All your saved items will
            appear here.
          </p>
          <a href="/">
            <button className="my-3 btn btn-success rounded-3">
              CONTINUE SHOPPING
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
