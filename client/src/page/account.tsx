import { useSelector } from "react-redux";

export default function Account() {
const { currentUser } = useSelector((state: any) => state.user);

  return (
    <>
        <div className="mtg bbot"><h3>Account Overview</h3></div>
        <div className="row" id="row">
          <div className="col-md-6 mb-4">
            <div className="acct_box rounded-3">
              <div className="head_box bbot p-2">ACCOUNT DETAILS</div>
              <div className="body_box ps-2">
                <h6>{currentUser.username}</h6>
                <h6 className="text-muted">{currentUser.email}</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="acct_box rounded-3">
              <div className="head_box bbot p-2">ADDRESS BOOK</div>
              <div className="body_box ps-2">
                <h6>Your default shipping address</h6>
                <h6 className="text-muted">No default shipping address available</h6>
                <h6 className="text-custom mt-3">ADD DEFAULT ADDRESS</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="acct_box rounded-3">
              <div className="head_box bbot p-2">DIGI STORE CREDIT</div>
              <div className="body_box ps-2">
                <h6 className="text-success fw-bolder"><i className="fa fa-card me-2"></i> $ 0.00</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="acct_box rounded-3">
              <div className="head_box bbot p-2">NEWSLETTER PREFERENCES</div>
              <div className="body_box ps-2">
                <h6>You are currently not subscribed to any of our newsletters</h6>
                <h6 className="text-custom mt-3">EDIT NEWSLETTER PREFERENCES</h6>
              </div>
            </div>
          </div>
        </div>
  </>
)}
