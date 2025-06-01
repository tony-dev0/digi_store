import review from '../assets/icons/acct/review.svg'

export default function Reviews() {
  return (
    <>
      <div className="mtg bbot">
        <h3>Pending Reviews</h3>
      </div>
      <div className="container">
        <div className="content">
          <img src={review} alt="" />
          <p>You have no order waiting for feedback</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. illis tofi{' '}
          </p>
          <p>
            {' '}
            dolor sit amet blocka desuo madf consci elit.beauty ,sofilli mantis
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
